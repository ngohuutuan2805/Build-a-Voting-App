'use strict';
var express = require('express')
var Router = express.Router()

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function (app, passport) {

	console.log('Indexing:');

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {

			if(req.isAuthenticated()){
				res.sendFile(path + '/public/main.html');
			} else {
				res.sendFile(path + '/public/index.html');
			}

		});

	app.route('/login')
		.get(passport.authenticate('github'));

	app.route('/logout')
		.get(function (req, res) {
			console.log('Index.js...Logout')

			req.logout();
			res.redirect('/');
		});

	app.route('/getPolls')
		.get(clickHandler.getPolls)

	app.route('/main')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/main.html');
		});

	app.route('/myPoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/main.html');
		});


	app.route('/newPoll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/newPoll.html');
		});


	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/main',
			failureRedirect: '/'
		}));

	app.route('/saveNewPoll')
		.post(isLoggedIn, clickHandler.saveNewPoll)


	app.route('/submit')
		.get(clickHandler.submit)

	app.route('/poll')
		.get(function (req, res) {

			if(req.isAuthenticated()){
				res.sendFile(path + '/public/authenticatedPoll.html');
			} else {
				res.sendFile(path + '/public/poll.html');
			}
			res.sendFile(path + '/public/poll.html')
		})

	app.route('/getPollContent')
		.get(clickHandler.showPoll)

};
