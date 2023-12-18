var LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const User = db.users;
var bcrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.use(new LocalStrategy(async function (username, password, done) {
        var user = await User.findOne({ where: { email: username, is_admin: '1' } });
        
        /*User.findOne({ where: { email: username } }, function (err, user) {
            console.log("aaa"+user);
           if (err)
                console.log(err);
         */  
            if (!user) {
                return done(null, false, {message: 'No user found!'});
            }

            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err)
                    console.log(err);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Wrong password.'});
                }
            });
        //});

    }));

    passport.serializeUser(function (user, done) {
       done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {

      var user  =  await User.findOne({ where: { id: id }})
             done(null, user);

      /*User.findOne({ where: { id: id }}, function (err, user) {
            done(err, user);
        });*/
    });

}

