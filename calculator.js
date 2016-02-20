'use strict';

/**
 * The main fn which will return the 
 * difference between start and end dates in number of days
 * @param  {[type]}   start [The start date]
 * @param  {[type]}   end   [The end date]
 * @param  {Function} cb    [Ask the user if he wants to continue]
 */
exports = module.exports = function(start, end, cb) {

	let math = require('./math.js');

	//Split date into corresponding months,days and year
	let splitDate = function(date) {
		let dateBits = date.split('/');
		if (dateBits.length < 3) {
			throw new Error('Please make sure the dates are in DD/MM/YYYY format.');
		}
		return {
			day: dateBits[0],
			month: dateBits[1],
			year: dateBits[2]
		};
	};

	let getDaysInMonth = function(month, year) {
		let days = 0;

		switch (true) {
			//Special case for February
			case month === 2 || month === '02':
				if (isLeapYear(year)) {
					days = 29;
				} else {
					days = 28;
				}
				break;
				//The odd months
			case month % 2 !== 0 || month % 7 === 0:
				days = 31;
				break;
				//The even months
			case month % 2 === 0:
				days = 30;
				break;
		}
		return days;
	};

	let isValidDate = function(date) {
		let isValid = true;
		switch (true) {
			case date.day < 1 || date.day > getDaysInMonth(date.month, date.year):
				isValid = false;
				break;
			case date.month < 1 || date.month > 12:
				isValid = false;
				break;
		}
		return isValid;
	};

	let startDate = splitDate(start);
	let endDate = splitDate(end);

	//Check if the dates are valid
	switch (true) {
		case isValidDate(startDate):
		case isValidDate(endDate):
			break;
		default:
			throw new Error('Invalid dates.');

	}

	//A leap year is a multiple 4 or 400,
	//but century years aren't leap
	let isLeapYear = function(year) {
		return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);
	};

	//Get the number of leap and non leap years between any two given 
	//year ranges
	let getNumberOfYears = function(startYear, endYear) {
		let difference = endYear - startYear;
		let leapYears = 0;

		while (endYear > startYear) {
			if (isLeapYear(endYear)) {
				leapYears++;
			}
			endYear--;
		}

		return {
			leap: leapYears,
			nonLeap: difference - leapYears
		};
	};

	//Calculate the number of days elapsed between the start year
	//and end year
	let getNumberOfYearDays = function(startYear, endYear) {
		let years = getNumberOfYears(startYear, endYear);
		return years.leap * 366 + years.nonLeap * 365;
	};

	//Get the day of the year.
	//Any given date would lie in the range of
	//1-365 (366 for leap year) for any given year
	let dayOfYear = function(date) {
		let days = 0;
		let month = date.month;

		while (month > 1) {
			month--;
			days += getDaysInMonth(month, date.year);
		}

		return math.toNumber(date.day) + days;
	};

	/**	
	 * Get the difference between the two given dates
	 * Expects that start date is always smaller than end date
	 * @param  {[type]}   start [description]
	 * @param  {[type]}   end   [description]
	 * @param  {Function} cb    [description]
	 * @return {[type]}         [description]
	 */
	let getDifference = function(start, end, cb) {

		let numberOfYearDays = getNumberOfYearDays(start.year, end.year);
		let dayOfYear_start = dayOfYear(start);
		let dayOfYear_end = dayOfYear(end);

		let difference = math.toNumber(numberOfYearDays + dayOfYear_end) - math.toNumber(dayOfYear_start);

		//Since end date isn't included,
		//subtract one day
		if (difference > 0) {
			difference -= 1;
		}

		cb(null, difference);
	};

	//Call the method
	//Make sure to follow the rule start date < end date
	switch (true) {
		case startDate.year > endDate.year:
			getDifference(endDate, startDate, cb);
			break;
		case startDate.month > endDate.month:
			getDifference(endDate, startDate, cb);
			break;
		default:
			getDifference(startDate, endDate, cb);
	}
};