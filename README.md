###The Date Calculator

Environment:
- The following software will run in any machine which has NodeJS installed.

How to run:
- To run the app, simply type `npm start`.

Testing:
- Run `npm install -g mocha` before running the test cases.
- To run the tests, type `npm test`.

Logic:
- The main idea is to calculate the distance between any two dates in terms of days elapsed:
  - Between the two given years, not considering the day and month.
  - Between the (day,month) pairs, only considering the year if it's a leap year.
- Subtract the days that have already passed for the starting year of the given range.
- The addition of the distance returned from above step will give us the difference between any two dates.
