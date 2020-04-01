"use strict";

var _neo4jGraphqlJs = require("neo4j-graphql-js");

var _CovidSchema = require("./Schemas/CovidSchema");

var _apolloServerExpress = require("apollo-server-express");

var _neo4jDriver = _interopRequireDefault(require("neo4j-driver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const {Wit, log} = require('node-wit')
require('dotenv').config();

var express = require('express');

var passport = require('passport');

var bodyParser = require('body-parser');

require('./configuration/passport');

var app = express();
var schema = (0, _neo4jGraphqlJs.makeAugmentedSchema)({
  typeDefs: _CovidSchema.typeDefs,
  resolvers: _CovidSchema.resolvers
});

var driver = _neo4jDriver["default"].driver(process.env.NEO4J_URI || 'bolt://localhost:7687', _neo4jDriver["default"].auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD));

app.use(bodyParser.json());
app.use(passport.initialize());
app.get('/auth/facebook', passport.authenticate('facebook', {
  session: false
}), function (rea, res) {
  res.send("a");
});
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  session: false
}, function (err, user, info) {
  console.log(user);
}));
app.get('/inside', passport.authenticate('facebook', {
  session: false,
  successRedirect: 'https://www.gooogle.com',
  failureRedirect: 'https://www.chaturbate.com'
}), function (req, res) {
  res.send("a");
});
app.get('/other', function (req, res) {
  res.send("oki");
});
var server = new _apolloServerExpress.ApolloServer({
  schema: schema,
  context: function context(_ref) {
    var req = _ref.req;
    return {
      driver: driver,
      req: req
    };
  }
});
server.applyMiddleware({
  app: app,
  path: '/'
});
app.listen(8080, 'localhost', function () {
  console.log('something');
});
module.exports = app;
/*const client = new Wit({
    accessToken: process.env.ACCESS_TOKEN,
    logger: new log.Logger(log.DEBUG)
})

console.log(client.message('tengo 5 baños en mi casa'));*/