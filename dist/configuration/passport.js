"use strict";

var passport = require('passport'),
    Facebookstrategy = require('passport-facebook').Strategy;

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config();

passport.use(new Facebookstrategy({
  clientID: process.env.CLIENT_FACEBOOK,
  clientSecret: process.env.CLIENT_FACEBOOK_SECRET,
  callbackURL: "http://localhost:8080/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'email', 'gender']
}, function (accessToken, refreshToken, profile, done) {
  done(null, profile);
}));
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
/*function (jwtPayload, done) {
    //console.log(jwtPayload)
    const query = `query UserFind($emailx : String){
        UserFind (Email : $emailx)
        {
            Name,
            Password,
            Email
        }}
    `
    const variables = {
        emailx : jwtPayload.sub 
    }
    let user = {}
    request('http://localhost:8080/graphql',query,variables).then((data) => {
        if(data){
            return done(null, data.UserFind);
        }
        else{
            return(done(null,false))
        }
        
    })


}*/
function (jwtPayload, done) {
  return done(null, false);
}));
module.exports = passport;