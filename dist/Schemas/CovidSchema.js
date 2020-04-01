"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = void 0;

var _neo4jGraphqlJs = require("neo4j-graphql-js");

var typeDefs = "\ntype User{\n    Id: ID!\n    Name: String\n    Lastname: String\n    Email: String\n    Gender: String\n    Username: String\n    Symptoms: [Symptom] @relation (name:\"SYMPTOM_HAVE\" direction: \"OUT\")\n    Locations: [Location] @relation (name:\"LOCATION_BE\" direction: \"OUT\")\n    Risks: [Risk] @relation (name:\"RISK_ASSOCIATED\" direction: \"OUT\")\n}\ntype Location{\n    Id: ID!\n    LatLon: Point\n}\ntype Symptom{\n    Id: ID!\n    EnfermedadCardiovascular: Boolean\n    Diabetes: Boolean\n    EnfermedadRespiratoriaCronica: Boolean\n}\ntype Risk{\n    Id: ID!\n    Percentage: Float\n}\ntype Query {\n    findUser(Id: ID) : [User]\n\n}\n\n\ntype Mutations{\n    CreateUser(Id: ID,\n        Name: String,\n        Lastname: String,\n        Email: String,\n        Gender: String,\n        Username: String): User\n    CreateLocation( Id: ID,\n        LatLon: Point ) : Location\n    CreateSymptom( Id: ID,\n        EnfermedadCardiovascular: Boolean,\n        Diabetes: Boolean,\n        EnfermedadRespiratoriaCronica: Boolean ) :Symptom\n        RelateSymptoms(fromUser: ID toSymptom: ID): User @cypher(\n            statement: \"\"\"\n                MATCH (to:Symptom {Id: $toSymptom})\n                MATCH (from:User {Id: $fromUser})\n                MERGE (from) - [:SYMPTOM_HAVE] -> (to)\n                RETURN from\n            \"\"\"\n        )\n    RelateLocation(fromUser: ID toLocation: ID) :User @cypher(\n        statement: \"\"\"\n            MATCH (to:Location {Id: $toLocation})\n            MATCH (from: User {Id: $fromUser})\n            MERGE (from) - [:LOCATION_BE] -> (to)\n            RETURN from\n        \"\"\"\n    )\n    RelateRisks(fromUser: ID toRisk: ID) :User @cypher(\n        statement: \"\"\"\n            MATCH (to:Risk {Id: $toRisk})\n            MATCH (from: User {Id: $fromUser})\n            MERGE (from) - [:RISK_ASSOCIATED] -> (to)\n            RETURN from\n        \"\"\"\n    )\n}\n";
exports.typeDefs = typeDefs;
var resolvers = {
  Query: {
    findUser: function findUser(object, parms, ctx, resolveInfo) {
      return (0, _neo4jGraphqlJs.neo4jgraphql)(object, parms, ctx, resolveInfo, true);
    }
  },
  Mutations: {
    CreateUser: function CreateUser(object, parms, ctx, resolveInfo) {
      return (0, _neo4jGraphqlJs.neo4jgraphql)(object, parms, ctx, resolveInfo, true);
    },
    CreateLocation: function CreateLocation(object, parms, ctx, resolveInfo) {
      return (0, _neo4jGraphqlJs.neo4jgraphql)(object, parms, ctx, resolveInfo, true);
    },
    CreateSymptom: function CreateSymptom(object, parms, ctx, resolveInfo) {
      return (0, _neo4jGraphqlJs.neo4jgraphql)(object, parms, ctx, resolveInfo, true);
    },
    RelateLocation: function RelateLocation(object, parms, ctx, resolveInfo) {
      return (0, _neo4jGraphqlJs.neo4jgraphql)(object, parms, ctx, resolveInfo, true);
    },
    RelateSymptoms: function RelateSymptoms(object, parms, ctx, resolveInfo) {
      return (0, _neo4jGraphqlJs.neo4jgraphql)(object, parms, ctx, resolveInfo, true);
    },
    RelateRisks: function RelateRisks(object, parms, ctx, resolveInfo) {
      return (0, _neo4jGraphqlJs.neo4jgraphql)(object, parms, ctx, resolveInfo, true);
    }
  }
};
exports.resolvers = resolvers;