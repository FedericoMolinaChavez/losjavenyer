const {Wit, log} = require('node-wit')
require('dotenv').config()
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
require('./configuration/passport')

const app = express();
app.use(bodyParser.json());
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
app.listen(8080, 'localhost', () => {
    console.log('something')
})
const client = new Wit({
    accessToken: process.env.ACCESS_TOKEN,
    logger: new log.Logger(log.DEBUG)
})

console.log(client.message('tengo 5 baños en mi casa'));