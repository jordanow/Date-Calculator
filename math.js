'use strict';

/**
 * Custom math library
 * @type {[type]}
 */
exports = module.exports = {

	ceil: function(number) {
		let decimalPart = number % 1;
		let rootPart = number - decimalPart;

		if (decimalPart * 10 > 0) {
			return number + 1;
		} else {
			return number;
		}

	},
	round: function(number) {
		let decimalPart = number % 1;
		let rootPart = number - decimalPart;

		if (decimalPart * 10 < 1) {
			return rootPart;
		} else {
			return rootPart + 1;
		}
	},
	floor: function(number) {
		let decimalPart = number % 1;
		let rootPart = number - decimalPart;

		return rootPart;
	},
	absolute: function(number) {
		if (number > 0) {
			return number;
		} else if (number < 0) {
			return -1 * number;
		} else {
			return number;
		}
	},
	toNumber: function(number) {
		return number * 1;
	}
};