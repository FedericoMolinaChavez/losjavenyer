//const {Wit, log} = require('node-wit')
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import {typeDefs, resolvers} from './Schemas/CovidSchema'
import {ApolloServer} from 'apollo-server-express'
import neo4j from 'neo4j-driver'
require('./configuration/passport')
const app = express();

const schema = makeAugmentedSchema({
    typeDefs,
    resolvers
})
const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(
        process.env.NEO4J_USER || 'neo4j',
        process.env.NEO4J_PASSWORD
    ) 
);app.use(bodyParser.json());



app.use(passport.initialize())

app.get('/auth/facebook', passport.authenticate('facebook',{
    session: false}
), (rea,res)=> {
    res.send("a")
});
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
                                    session: false, 
                                    }, (err, user, info) => {
                                        console.log(user);
                                    }));
app.get('/inside', passport.authenticate('facebook', {session:false, successRedirect:'https://www.gooogle.com',failureRedirect:'https://www.chaturbate.com'}), (req,res) => {
    res.send("a")
})
app.get('/other', (req,res)=> {
    res.send("oki")
})


const server = new ApolloServer({
    schema,
    context: ({req}) => {
        return{
            driver,
            req
        }
    }
})
server.applyMiddleware({app, path: '/'}, );
app.listen(8080, 'localhost', () => {
    console.log('something')
})

module.exports = app
/*const client = new Wit({
    accessToken: process.env.ACCESS_TOKEN,
    logger: new log.Logger(log.DEBUG)
})

console.log(client.message('tengo 5 baños en mi casa'));*/