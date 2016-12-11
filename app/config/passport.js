'use strict';

var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/users');
var configAuth = require('./auth');

module.exports = function (passport) {

	console.log('Passport - github auth:')
    console.log(configAuth.githubAuth.clientID)
	console.log(configAuth.githubAuth.clientSecret)
	console.log(configAuth.githubAuth.callbackURL)

	passport.serializeUser(function (user, done) {
		console.log('Passport serialize user')

	    done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
        console.log('Passport deserialize user')

	    User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy({
		clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL
	},
	function (token, refreshToken, profile, done) {
        console.log('Passport token       : ' + token)
        console.log('Passport refreshtoken: ' + refreshToken)
        console.log('Passport user profile: ' + profile.toString())

		process.nextTick(function () {
			User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}

				if (user) {
					return done(null, user);
				} else {
				    // Trường hợp chưa có user nào
					var newUser = new User();

					newUser.github.id = profile.id;
					newUser.github.username = profile.username;
					newUser.github.displayName = profile.displayName;
					newUser.github.publicRepos = profile._json.public_repos;
					newUser.nbrClicks.clicks = 0;

					newUser.save(function (err) {
						if (err) {
							throw err;
						}

						return done(null, newUser);
					});
				}
			});
		});
	}));
};
