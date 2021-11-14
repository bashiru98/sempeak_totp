const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: 'https://sempeak-totp.herokuapp.com/auth/google/callback',
      clientID: "763693156568-uumnqf56lohntf2r3tecn75pnb88o52v.apps.googleusercontent.com",
      clientSecret: "p95THafvsHRIX6ddwH6SNmn0",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
      
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }
        
        const user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email:profile.emails[0].value,
        }).save();
        done(null, user);
      } catch (err) {
        console.log(err)
        done(err, null);
      }
    }
  )
);
