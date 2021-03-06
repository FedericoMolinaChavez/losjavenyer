calculate = (data, evt) => {
    // Imports: This calculations uses 'ramda' noted as 'R'
    const {cardiovascularDisease, diabetes, chronicRespitoryDisease, hypertension, cancer, ageRange, sex, country, province} = data
    // The expected difference is ~50% between Male and Female so a multiplier should
    // be 1.5 times female rates equals male rates centered on 1. This would be ~.8 and ~1.2.
    // Because of expected interplay between this and other factors in Wuhan (like smoking),
    // along with lack of data, this is reduced to ~.9 and ~1.1 respectively.
    // This attempts to keep male rates from beeing significantly overstated when rates
    // are likely closer than the initial data would suggest.
    // Note: This should be updated as more accurate data comes in
    const sexMultiplierData={
      'male':1.1,
      'female':0.9
    }
    // If no sex is given, use a multiplier of 1
    const sexMultiplier=R.propOr(1, sex, sexMultiplierData)
  
    // Get the global stats from the python preprocessor
    const getGlobalData = () => R.propOr({},'stats', locationData)
  
    // Get country stats from the python preprocessor
    const getCountryData = (country) => R.pathOr(
      getGlobalData(),
      ['countries', country, 'stats']
    )(locationData)
  
    // Get Location stats from the python preprocessor
    const getLocationData = () => R.pathOr(
      getCountryData(country),
      ['countries', country, 'provinces', province, 'stats']
    )(locationData)
  
    // Take location pct survival divided by global pct to get a location multiplier
    // Put that to the power of the log trust (log count outcomes / log cases)
    // Note: log trust is calculated per region and per country and is always between 0 and 1.
    // To force reasonableness, constrain multiplier to be between .5 and 1.5
  
    const locationMultiplier = () => {
      const locationStats = getLocationData()
      const globalStats = getGlobalData()
      const output = Math.min(
        Math.max(
          Math.pow(
            (locationStats['pct']/globalStats['pct']),
            locationStats['trust']
          ),
          .5
        ),
        1.5
      )
      return output
    }
  
    // const locationMultiplier=R.pathOr(1, ['countries', country, province])
    // The actual age range death rates given by the data
    const ageRateData={
      '9-': 0,
      '10-19': 0.002,
      '20-29': 0.002,
      '30-39': 0.002,
      '40-49': 0.004,
      '50-59': 0.013,
      '60-69': 0.036,
      '70-79': 0.08,
      '80+': 0.148
    }
    // For the current selection, get the probabilities for each of the following conditions
    // Note ageRate defaults to the expected general rate of .022 if no age range is selected.
    const ageRate=R.propOr(0.022, ageRange, ageRateData)
    const cardiovascularDiseaseRate=cardiovascularDisease?.105:0
    const diabetesRate=diabetes?.073:0
    const chronicRespitoryDiseaseRate=chronicRespitoryDisease?.063:0
    const hypertensionRate=hypertension?.060:0
    const cancerRate=cancer?.056:0
  
  
    // Given lack of data and assumed interplay,
    // For each item in the current selection, add the max of
    //   50% of each death rate
    //   The difference between 80% of the current death rate and the current expected death rate
    // Note: This is highly oversimplified and order matters.
    // Note: This is why it is ordered from potential highest factors (age being uncertain) down to the smallest factors.
    // Note: This is only a rough calculation and attempts to capture assumed interplay with extremely low data.
    const conditionCalc = (rate, conditionRate) => (R.max((conditionRate/2),((conditionRate)-(rate*.8)))+rate)
    // Generate the death rate percentage
    // This is converted into survival (1-pct) in the component showing survival rate
    const pct = R.reduce(conditionCalc, 0, [ageRate, cardiovascularDiseaseRate, diabetesRate, chronicRespitoryDiseaseRate, hypertensionRate, cancerRate])*sexMultiplier*locationMultiplier()
  
    this.setState({data: R.assoc('output', pct, data)})
  }