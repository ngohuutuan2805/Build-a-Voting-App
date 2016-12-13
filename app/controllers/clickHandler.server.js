'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js')


function ClickHandler () {
	console.log("ClickHandler.server.js..")

	this.getPolls = function (req, res) {
		console.log('clickHandler.server.js: Get polls ...')

		Polls
			.find({}, {'_id':1, 'title':1, 'createByUser':1, 'options.option':1, 'options.selectedCount':1})
			.exec(function (err, result) {
				if (err) throw  err

				res.json(result)
			})
	}


	this.saveNewPoll = function (req, res) {
		console.log('clickHandler.server.js: Save new poll...')

		var newPoll = new Polls()

		console.log('clickHandler.server.js: did received post request body: ' + JSON.stringify(req.body))

		newPoll.title = req.body.title
		newPoll.options = req.body.options
		newPoll.createByUser = req.user.id


		newPoll.save(function (err) {
			if(err) throw err

			res.send(newPoll)
		})
	}

	this.showPoll = function (req, res) {
		console.log('clickHandler.server.js: Show poll id...' + req.query.id)

		Polls
			.find({'_id':req.query.id}, {'_id':1, 'title':1, 'createByUser':1, 'options._id':1, 'options.option':1, 'options.selectedCount':1})
			.exec(function (err, poll) {
				if (err) throw  err

				console.log('Server founded a poll: ' + poll)

				res.send(poll)
			})
	}

	this.submit = function (req, res) {

		var pollId = req.query.id
		var optionId = req.query.optionId
		console.log('clickHandler.server.js: Submit ...' + pollId + " " + optionId)

		Polls
			.findOneAndUpdate({'_id':pollId, 'options._id':optionId}, {$inc:{'options.$.selectedCount':1}})
			.exec(function (err, result) {

				console.log("Update poll: " + result)

				if(err) res.send({"result":"false"})

				res.send({"result":"true"})
			})
	}
}
module.exports = ClickHandler;
