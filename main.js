var calculator = require('./calculator.js');
var prompt = require('prompt');

exports = module.exports = (function() {
	'use strict';
	/**	
	 * Continue or exit the program based on user input
	 * @return {[type]} [description]
	 */
	function getMore() {
		prompt.get(['Resume?(Y/N)'], function(err, response) {
			if (err) {
				console.log('Over');
			} else {
				let shouldContinue = response['Resume?(Y/N)'];
				shouldContinue = shouldContinue.toUpperCase();

				switch (shouldContinue) {
					case 'Y':
						console.log('Continuing.....');
						getInputs();
						break;
					default:
						console.log('Over');
				}
			}
		});
	}

	/**
	 * Using the lib 'prompt' to request for user input
	 * @return {[type]} [description]
	 */
	function getInputs() {
		prompt.get(['Start date', 'End date'], function(err, response) {
			if (err) {
				console.log(err.message);
			} else {
				let start = response['Start date'];
				let end = response['End date'];

				try {
					calculator(start, end, getMore);
				} catch (e) {
					console.log(e);
				}
			}
		});
	}

	getInputs();
})();