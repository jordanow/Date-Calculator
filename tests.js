var moment = require('moment');
var calculator = require('./calculator.js');
var assert = require('assert');

exports = module.exports = (function() {
	'use strict';

	describe('Testing the Calculator', function() {
		let cases = [{
			start: '02/06/1983',
			end: '22/06/1983',
			expected: '19'
		}, {
			start: '04/07/1984',
			end: '25/12/1984',
			expected: '173'
		}, {
			start: '03/01/1989',
			end: '03/08/1983',
			expected: '1979'
		}, {
			start: '03/01/1989',
			end: '03/01/1989',
			expected: '0'
		}];

		cases.forEach(function(testCase) {
			it(`should return ${testCase.expected} days for ${testCase.end} to ${testCase.start}`, function() {
				calculator(testCase.start, testCase.end, function(err, difference) {
					assert.equal(difference, testCase.expected);
				});
			});
		});

	});
})();