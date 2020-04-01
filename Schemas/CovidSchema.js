import {neo4jgraphql} from 'neo4j-graphql-js'

export const typeDefs = `
type User{
    Id: ID!
    Name: String
    Lastname: String
    Email: String
    Gender: String
    Username: String
    Symptoms: [Symptom] @relation (name:"SYMPTOM_HAVE" direction: "OUT")
    Locations: [Location] @relation (name:"LOCATION_BE" direction: "OUT")
    Risks: [Risk] @relation (name:"RISK_ASSOCIATED" direction: "OUT")
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
type Risk{
    Id: ID!
    Percentage: Float
}
type Query {
    findUser(Id: ID) : [User]

}


type Mutations{
    CreateUser(Id: ID,
        Name: String,
        Lastname: String,
        Email: String,
        Gender: String,
        Username: String): User
    CreateLocation( Id: ID,
        LatLon: Point ) : Location
    CreateSymptom( Id: ID,
        EnfermedadCardiovascular: Boolean,
        Diabetes: Boolean,
        EnfermedadRespiratoriaCronica: Boolean ) :Symptom
        RelateSymptoms(fromUser: ID toSymptom: ID): User @cypher(
            statement: """
                MATCH (to:Symptom {Id: $toSymptom})
                MATCH (from:User {Id: $fromUser})
                MERGE (from) - [:SYMPTOM_HAVE] -> (to)
                RETURN from
            """
        )
    RelateLocation(fromUser: ID toLocation: ID) :User @cypher(
        statement: """
            MATCH (to:Location {Id: $toLocation})
            MATCH (from: User {Id: $fromUser})
            MERGE (from) - [:LOCATION_BE] -> (to)
            RETURN from
        """
    )
    RelateRisks(fromUser: ID toRisk: ID) :User @cypher(
        statement: """
            MATCH (to:Risk {Id: $toRisk})
            MATCH (from: User {Id: $fromUser})
            MERGE (from) - [:RISK_ASSOCIATED] -> (to)
            RETURN from
        """
    )
}
`;
export const resolvers = {
    Query:{
        findUser(object, parms, ctx, resolveInfo){
            return neo4jgraphql(object, parms, ctx, resolveInfo, true);
        },
    },
    Mutations: {
        CreateUser(object, parms, ctx, resolveInfo){
            return neo4jgraphql(object, parms, ctx, resolveInfo, true);
        },
        CreateLocation(object, parms, ctx, resolveInfo){
            return neo4jgraphql(object, parms, ctx, resolveInfo, true);
        },
        CreateSymptom(object, parms, ctx, resolveInfo){
            return neo4jgraphql(object, parms, ctx, resolveInfo, true);
        },
        RelateLocation(object, parms, ctx, resolveInfo){
            return neo4jgraphql(object, parms, ctx, resolveInfo, true);
        },
        RelateSymptoms(object, parms, ctx, resolveInfo){
            return neo4jgraphql(object, parms, ctx, resolveInfo, true);
        },
        RelateRisks(object, parms, ctx, resolveInfo){
            return neo4jgraphql(object, parms, ctx, resolveInfo, true);
        },

    }
};