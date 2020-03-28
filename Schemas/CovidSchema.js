import {neo4jgraphql} from 'neo4j-graphql-js'

export const typeDefs = `
type User{
    Id: ID!
    Name: String
    Lastname: String
    Email: String
    Gender: String
    Username: String
    Symptoms: [Symptom] @relation (name:"SYMPTOM_HAVE" direction: "OUT)
    Locations: [Location] @relation (name:"LOCATION_BE" direction: "OUT)
}
type Location{
    Id: ID!
    LatLon: Point
}
type Symptom{
    Id: ID!
    EnfermedadCardiovascular: Boolean
    Diabetes: Boolean
    EnfermedadRespiratoriaCronica: Boolean
}

type Query {

}

type Mutation{
    
}

`
export const resolvers = {

}