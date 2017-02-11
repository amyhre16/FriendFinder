'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var friendsData = require('../data/friends.js');

exports.getFriends = app.get('/api/friends', function(req, res) {
	res.json(friendsData.friends);
});

exports.postFriends = app.post('/api/friends', function(req, res) {
	var newUser = req.body;
	// console.log(newUser['scores[]']);
	console.log(friendsData.friends);
	/*for (var i = 0; i < friendsData.friends.length; i++) {
		console.log();
		console.log(friendsData.friends[i].scores);
	}*/

	// start off with a lowest score being 0 and the best match being the first friend in the array
	var lowScore = 0;
	var bestMatch = 0;

	// loop through the first friend's scores to set an inital lowest score
	for (var j = 0; j < friendsData.friends[0].scores.length; j++) {
		// console.log(friendsData.friends[0].scores[j]);
		// lowScore += Math.abs(newUser.scores[j] - friendsData.friends[0].scores[j]);
		lowScore += Math.abs(newUser['scores[]'][j] - friendsData.friends[0].scores[j]);
	}

	// loop through the rest of the friends to check to see if any of them have a lower score (i.e., is a better match)
	for (var i = 1; i < friendsData.friends.length; i++) {
		var sum = 0;
		for (var j = 0; j < friendsData.friends[i].scores.length; j++) {
			sum += Math.abs(parseInt(newUser['scores[]'][j]) - friendsData.friends[i].scores[j]);
		}
		console.log("Current best: " + lowScore);
		console.log(friendsData.friends[i] + ": " + sum);
		// if the sum of the differences in scores is lower than the current low score, then assign the sum to lowScore
		if (lowScore > sum) {
			lowScore = sum;
			bestMatch = i;
		}
	}

	// add the new user to the friends array
	friendsData.friends.push(newUser);

	// return the best match to the where the post request is made
	res.send(friendsData.friends[bestMatch]);
});