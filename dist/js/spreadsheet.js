(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('./util');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a spreadsheet by generating an HTML table
 * and then converting it into an excel document
 *
 * @param  {object} invoiceInfo
 * @return {string}
 */
function createSpreadsheet(invoiceInfo) {
  var table = generateTable(invoiceInfo);
  var url = tableToExcel(table);

  return url;
}

/**
 * Generates an HTML table using static information
 * as well as dynamically generating the rest of the
 * invoice by using the invoiceInfo given as input
 *
 * @param {string} invoiceInfo.userName
 * @param {string} invoiceInfo.totalHours
 * @param {string} invoiceInfo.startDate
 * @param {string} invoiceInfo.endDate
 * @param {array}  invoiceInfo.shifts
 * @return {object}
 */
function generateTable(_ref) {
  var userName = _ref.userName;
  var email = _ref.email;
  var address = _ref.address;
  var totalHours = _ref.totalHours;
  var startDate = _ref.startDate;
  var endDate = _ref.endDate;
  var shifts = _ref.shifts;

  var worksheet = userName + ' Invoice Template';
  var hoursNum = parseFloat(totalHours);
  var hourlyRate = 15;
  var totalAmount = (hoursNum * hourlyRate).toFixed(2);

  var template = '\n    <table style="' + _styles2.default.table + '" cellpadding="5" border="1" bordercolor="EEEEEE">\n      <tr>\n        <td style="' + _styles2.default.topHeader + '" colspan="5">Please make sure to submit your invoice as a PDF (File > Save As > PDF)</td>\n      </tr>\n      <tr>\n        <td style="' + _styles2.default.subHeaders.top + '" colspan="5"><em>*Invoices should be emailed directly to Codecademy@bill.com or faxed to 646.365.7939</em></td>\n      </tr>\n      <tr>\n        <td style="' + _styles2.default.subHeaders.bottom + '" colspan="5"><em>*If you\'re a new advisor, please be sure to attach your W-9 form!</em></td>\n      </tr>\n      <tr>\n        <td><strong>To: Codecademy</strong></td>\n        ' + (0, _util.emptyCols)(4) + '\n      </tr>\n      <tr>\n        <td><strong>49 West 27th Street - 4th Floor</strong></td>\n        ' + (0, _util.emptyCols)(4) + '\n      </tr>\n      <tr>\n        <td><strong>New York, NY 10001</strong></td>\n        ' + (0, _util.emptyCols)(4) + '\n      </tr>\n      ' + (0, _util.emptyRow)() + '\n      <tr>\n        <td><strong>YOUR NAME:</strong></td>\n        <td>' + userName + '</td>\n        ' + (0, _util.emptyCols)(3) + '\n      </tr>\n      <tr>\n        <td><strong>YOUR EMAIL:</strong></td>\n        <td>' + (email || 'REPLACE THIS') + '</td>\n        ' + (0, _util.emptyCols)(3) + '\n      </tr>\n      <tr>\n        <td><strong>YOUR ADDRESS:</strong></td>\n        <td>' + (address || 'REPLACE THIS') + '</td>\n        ' + (0, _util.emptyCols)(3) + '\n      </tr>\n      <tr style="' + _styles2.default.invoiceDetails + '">\n        <td><strong>INVOICING DETAILS</strong></td>\n        <td colspan="3"><strong>DESCRIPTION OVERVIEW</strong></td>\n        <td><strong>AMOUNT</strong></td>\n      </tr>\n      <tr>\n        <td style="' + _styles2.default.faded + '"><em>Item 1</em></td>\n        <td style="' + _styles2.default.faded + '" colspan="3"><em>i.e. Training Hours</em></td>\n        <td style="' + _styles2.default.alignFix + ' ' + _styles2.default.faded + '"><strong>$0.00</strong></td>\n      </tr>\n      <tr>\n        <td><em>Item 2</em></td>\n        <td colspan="3"><em>i.e. Advisor Shifts</em></td>\n        <td style="' + _styles2.default.alignFix + '"><strong>$' + totalAmount + '</strong></td>\n      </tr>\n      <tr>\n        <td style="' + _styles2.default.faded + '"><em>Item 3</em></td>\n        <td style="' + _styles2.default.faded + '" colspan="3"><em>i.e. Content Hours</em></td>\n        <td style="' + _styles2.default.alignFix + ' ' + _styles2.default.faded + '"><strong>$0.00</strong></td>\n      </tr>\n      <tr style="' + _styles2.default.amountRequested + '">\n        <td colspan="4"><strong>TOTAL AMOUNT REQUESTED ($)</strong></td>\n        <td style="' + _styles2.default.alignFix + '"><strong>$' + totalAmount + '</strong></td>\n      </tr>\n      ' + (0, _util.emptyRow)() + '\n      <tr>\n        <td><strong>INVOICE PERIOD</strong></td>\n        ' + (0, _util.emptyCols)(3) + '\n        <td><strong>' + startDate + ' - ' + endDate + '</strong></td>\n      </tr>\n      <tr>\n        <td><strong>DUE DATE</strong></td>\n        ' + (0, _util.emptyCols)(3) + '\n        <td style="' + _styles2.default.alignFix + '"><strong>' + new Date().toLocaleDateString() + '</strong></td>\n      </tr>\n      <tr>\n        <td><strong>TOTAL HOURS WORKED</strong></td>\n        ' + (0, _util.emptyCols)(3) + '\n        <td style="' + _styles2.default.alignFix + '"><strong>' + hoursNum + '</strong></td>\n      </tr>\n      <tr>\n        <td><strong>HOURLY RATE ($/HR)</strong></td>\n        ' + (0, _util.emptyCols)(3) + '\n        <td><strong>$15.00/HR</strong></td>\n      </tr>\n      <tr>\n        <td><strong>DESCRIPTION OF SERVICES</strong></td>\n        ' + (0, _util.emptyCols)(3) + '\n        <td><strong>Codecademy Consultant</strong></td>\n      </tr>\n      <tr>\n        <td><strong>MANAGER</strong></td>\n        ' + (0, _util.emptyCols)(3) + '\n        <td><strong>Daniella Kisza</strong></td>\n      </tr>\n      ' + (0, _util.emptyRow)() + '\n      <tr style="' + _styles2.default.shiftInfo + '">\n        ' + (0, _util.emptyCols)(1) + '\n        <td colspan="1"><strong>DETAILED DESCRIPTION</strong></td>\n        <td><strong>DATE</strong></td>\n        <td><strong>TIME</strong></td>\n        <td><strong>HOURS</strong></td>\n      </tr>\n      ' + (0, _util.getShiftRows)(shifts) + '\n    </table>\n  ';

  var table = { template: template, worksheet: worksheet };

  return table;
}

/**
 * Converts an HTML table to an excel sheet
 *
 * @param  {string} table.template
 * @param  {string} table.worksheet
 * @return {string}
 */
function tableToExcel(_ref2) {
  var template = _ref2.template;
  var worksheet = _ref2.worksheet;

  var base64 = function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
  };
  var uri = 'data:application/vnd.ms-excel;base64,';
  var excelTemplate = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>' + worksheet + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>' + template + '</table></body></html>';

  return uri + base64(excelTemplate);
}

exports.default = createSpreadsheet;
module.exports = exports['default'];

},{"./styles":3,"./util":4}],2:[function(require,module,exports){
'use strict';

var _createSpreadsheet = require('./create-spreadsheet');

var _createSpreadsheet2 = _interopRequireDefault(_createSpreadsheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

chrome.runtime.onMessage.addListener(function (response, _, sendResponse) {
  chrome.storage.sync.get(['address', 'email'], function (data) {
    var invoiceData = Object.assign(response, data);
    var url = (0, _createSpreadsheet2.default)(invoiceData);
    var filename = response.userName.split(' ').join('-') + '-invoice.xls';

    chrome.downloads.download({ filename: filename, url: url });
  });
});

},{"./create-spreadsheet":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var colors = {
  red: '#E26563',
  pink: '#EC9898',
  gray: 'gray',
  darkGray: '#D9D9D9',
  lightGray: '#EFEFEF',
  midGray: '#CCCCCC'
};

var styles = {
  table: 'text-align: left; font-size: 7px; font-family: Arial, sans-serif; border-collapse: collapse;',
  topHeader: 'background-color: ' + colors.red + ';',
  subHeaders: {
    top: 'background-color: ' + colors.pink + ';',
    bottom: 'border-bottom: 10px solid ' + colors.gray + '; background-color: ' + colors.pink + ';'
  },
  invoiceDetails: 'background-color: ' + colors.darkGray + ';',
  faded: 'color: ' + colors.gray + ';',
  amountRequested: 'background-color: ' + colors.lightGray + ';',
  alignFix: 'text-align: left;',
  shiftInfo: 'background-color: ' + colors.midGray + '; text-align: left;'
};

exports.default = styles;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyCols = exports.emptyRow = exports.getShiftRows = undefined;

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dynamically creates the rows of each
 * individual shift entry
 *
 * @param  {array} shifts
 * @return {string}
 */
function getShiftRows(shifts) {
  var shiftRows = '';

  shifts.forEach(function (shift, i) {
    var date = shift.date;
    var startTime = shift.startTime;
    var endTime = shift.endTime;
    var duration = shift.duration;


    shiftRows += '\n      <tr style="' + _styles2.default.alignFix + '">\n        ' + emptyCols(1) + '\n        <td>Shift ' + (i + 1) + '</td>\n        <td>' + date + '</td>\n        <td>' + startTime + ' - ' + endTime + '</td>\n        <td>' + duration + '</td>\n      </tr>\n    ';
  });

  return shiftRows;
}

/**
 * Creates an empty row in the template
 *
 * @return {string}
 */
function emptyRow() {
  return '\n    <tr>\n      <td></td>\n      <td></td>\n      <td></td>\n      <td></td>\n      <td></td>\n    </tr>\n  ';
}

/**
 * Creates a given amount of columns
 *
 * @param  {number} numOfCols
 * @return {string}
 */
function emptyCols(numOfCols) {
  return '<td></td>'.repeat(numOfCols);
}

exports.getShiftRows = getShiftRows;
exports.emptyRow = emptyRow;
exports.emptyCols = emptyCols;

},{"./styles":3}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc3ByZWFkc2hlZXQvY3JlYXRlLXNwcmVhZHNoZWV0LmpzIiwic3JjL3NwcmVhZHNoZWV0L2luZGV4LmpzIiwic3JjL3NwcmVhZHNoZWV0L3N0eWxlcy5qcyIsInNyYy9zcHJlYWRzaGVldC91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFTQSxTQUFTLGlCQUFULENBQTJCLFdBQTNCLEVBQXdDO0FBQ3RDLE1BQU0sUUFBUSxjQUFjLFdBQWQsQ0FBUixDQURnQztBQUV0QyxNQUFNLE1BQU0sYUFBYSxLQUFiLENBQU4sQ0FGZ0M7O0FBSXRDLFNBQU8sR0FBUCxDQUpzQztDQUF4Qzs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsU0FBUyxhQUFULE9BQTZGO01BQXBFLHlCQUFvRTtNQUExRCxtQkFBMEQ7TUFBbkQsdUJBQW1EO01BQTFDLDZCQUEwQztNQUE5QiwyQkFBOEI7TUFBbkIsdUJBQW1CO01BQVYscUJBQVU7O0FBQzNGLE1BQU0sWUFBZSw4QkFBZixDQURxRjtBQUUzRixNQUFNLFdBQVcsV0FBVyxVQUFYLENBQVgsQ0FGcUY7QUFHM0YsTUFBTSxhQUFhLEVBQWIsQ0FIcUY7QUFJM0YsTUFBTSxjQUFjLENBQUMsV0FBVyxVQUFYLENBQUQsQ0FBd0IsT0FBeEIsQ0FBZ0MsQ0FBaEMsQ0FBZCxDQUpxRjs7QUFNM0YsTUFBTSxvQ0FDWSxpQkFBTyxLQUFQLDJGQUVDLGlCQUFPLFNBQVAsZ0pBR0EsaUJBQU8sVUFBUCxDQUFrQixHQUFsQixzS0FHQSxpQkFBTyxVQUFQLENBQWtCLE1BQWxCLDJMQUlYLHFCQUFVLENBQVYsK0dBSUEscUJBQVUsQ0FBVixrR0FJQSxxQkFBVSxDQUFWLDhCQUVGLHFHQUdNLCtCQUNKLHFCQUFVLENBQVYsZ0dBSUksU0FBUyxjQUFULHdCQUNKLHFCQUFVLENBQVYsa0dBSUksV0FBVyxjQUFY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QixTQUFPLE9BQVAsQ0FBZSxVQUFDLEtBQUQsRUFBUSxDQUFSLEVBQWM7UUFDbkIsT0FBdUMsTUFBdkMsS0FEbUI7UUFDYixZQUFpQyxNQUFqQyxVQURhO1FBQ0YsVUFBc0IsTUFBdEIsUUFERTtRQUNPLFdBQWEsTUFBYixTQURQOzs7QUFHM0IseUNBQ2UsaUJBQU8sUUFBUCxvQkFDVCxVQUFVLENBQVYsOEJBQ1UsSUFBSSxDQUFKLDRCQUNOLCtCQUNBLG9CQUFlLGtDQUNmLHFDQU5WLENBSDJCO0dBQWQsQ0FBZixDQUg0Qjs7QUFpQjVCLFNBQU8sU0FBUCxDQWpCNEI7Q0FBOUI7Ozs7Ozs7QUF5QkEsU0FBUyxRQUFULEdBQW9CO0FBQ2xCLDBIQURrQjtDQUFwQjs7Ozs7Ozs7QUFrQkEsU0FBUyxTQUFULENBQW1CLFNBQW5CLEVBQThCO0FBQzVCLFNBQU8sWUFBWSxNQUFaLENBQW1CLFNBQW5CLENBQVAsQ0FENEI7Q0FBOUI7O1FBS0U7UUFDQTtRQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGdldFNoaWZ0Um93cywgZW1wdHlSb3csIGVtcHR5Q29scyB9IGZyb20gJy4vdXRpbCdcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9zdHlsZXMnXG5cbi8qKlxuICogQ3JlYXRlcyBhIHNwcmVhZHNoZWV0IGJ5IGdlbmVyYXRpbmcgYW4gSFRNTCB0YWJsZVxuICogYW5kIHRoZW4gY29udmVydGluZyBpdCBpbnRvIGFuIGV4Y2VsIGRvY3VtZW50XG4gKlxuICogQHBhcmFtICB7b2JqZWN0fSBpbnZvaWNlSW5mb1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjcmVhdGVTcHJlYWRzaGVldChpbnZvaWNlSW5mbykge1xuICBjb25zdCB0YWJsZSA9IGdlbmVyYXRlVGFibGUoaW52b2ljZUluZm8pXG4gIGNvbnN0IHVybCA9IHRhYmxlVG9FeGNlbCh0YWJsZSlcblxuICByZXR1cm4gdXJsXG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGFuIEhUTUwgdGFibGUgdXNpbmcgc3RhdGljIGluZm9ybWF0aW9uXG4gKiBhcyB3ZWxsIGFzIGR5bmFtaWNhbGx5IGdlbmVyYXRpbmcgdGhlIHJlc3Qgb2YgdGhlXG4gKiBpbnZvaWNlIGJ5IHVzaW5nIHRoZSBpbnZvaWNlSW5mbyBnaXZlbiBhcyBpbnB1dFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnZvaWNlSW5mby51c2VyTmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGludm9pY2VJbmZvLnRvdGFsSG91cnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnZvaWNlSW5mby5zdGFydERhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnZvaWNlSW5mby5lbmREYXRlXG4gKiBAcGFyYW0ge2FycmF5fSAgaW52b2ljZUluZm8uc2hpZnRzXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlVGFibGUoeyB1c2VyTmFtZSwgZW1haWwsIGFkZHJlc3MsIHRvdGFsSG91cnMsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2hpZnRzIH0pIHtcbiAgY29uc3Qgd29ya3NoZWV0ID0gYCR7dXNlck5hbWV9IEludm9pY2UgVGVtcGxhdGVgXG4gIGNvbnN0IGhvdXJzTnVtID0gcGFyc2VGbG9hdCh0b3RhbEhvdXJzKVxuICBjb25zdCBob3VybHlSYXRlID0gMTVcbiAgY29uc3QgdG90YWxBbW91bnQgPSAoaG91cnNOdW0gKiBob3VybHlSYXRlKS50b0ZpeGVkKDIpXG5cbiAgY29uc3QgdGVtcGxhdGUgPSBgXG4gICAgPHRhYmxlIHN0eWxlPVwiJHtzdHlsZXMudGFibGV9XCIgY2VsbHBhZGRpbmc9XCI1XCIgYm9yZGVyPVwiMVwiIGJvcmRlcmNvbG9yPVwiRUVFRUVFXCI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZCBzdHlsZT1cIiR7c3R5bGVzLnRvcEhlYWRlcn1cIiBjb2xzcGFuPVwiNVwiPlBsZWFzZSBtYWtlIHN1cmUgdG8gc3VibWl0IHlvdXIgaW52b2ljZSBhcyBhIFBERiAoRmlsZSA+IFNhdmUgQXMgPiBQREYpPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZCBzdHlsZT1cIiR7c3R5bGVzLnN1YkhlYWRlcnMudG9wfVwiIGNvbHNwYW49XCI1XCI+PGVtPipJbnZvaWNlcyBzaG91bGQgYmUgZW1haWxlZCBkaXJlY3RseSB0byBDb2RlY2FkZW15QGJpbGwuY29tIG9yIGZheGVkIHRvIDY0Ni4zNjUuNzkzOTwvZW0+PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZCBzdHlsZT1cIiR7c3R5bGVzLnN1YkhlYWRlcnMuYm90dG9tfVwiIGNvbHNwYW49XCI1XCI+PGVtPipJZiB5b3UncmUgYSBuZXcgYWR2aXNvciwgcGxlYXNlIGJlIHN1cmUgdG8gYXR0YWNoIHlvdXIgVy05IGZvcm0hPC9lbT48L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPjxzdHJvbmc+VG86IENvZGVjYWRlbXk8L3N0cm9uZz48L3RkPlxuICAgICAgICAke2VtcHR5Q29scyg0KX1cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD48c3Ryb25nPjQ5IFdlc3QgMjd0aCBTdHJlZXQgLSA0dGggRmxvb3I8L3N0cm9uZz48L3RkPlxuICAgICAgICAke2VtcHR5Q29scyg0KX1cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD48c3Ryb25nPk5ldyBZb3JrLCBOWSAxMDAwMTwvc3Ryb25nPjwvdGQ+XG4gICAgICAgICR7ZW1wdHlDb2xzKDQpfVxuICAgICAgPC90cj5cbiAgICAgICR7ZW1wdHlSb3coKX1cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPjxzdHJvbmc+WU9VUiBOQU1FOjwvc3Ryb25nPjwvdGQ+XG4gICAgICAgIDx0ZD4ke3VzZXJOYW1lfTwvdGQ+XG4gICAgICAgICR7ZW1wdHlDb2xzKDMpfVxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPjxzdHJvbmc+WU9VUiBFTUFJTDo8L3N0cm9uZz48L3RkPlxuICAgICAgICA8dGQ+JHtlbWFpbCB8fCAnUkVQTEFDRSBUSElTJ308L3RkPlxuICAgICAgICAke2VtcHR5Q29scygzKX1cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD48c3Ryb25nPllPVVIgQUREUkVTUzo8L3N0cm9uZz48L3RkPlxuICAgICAgICA8dGQ+JHthZGRyZXNzIHx8ICdSRVBMQUNFIFRISVMnfTwvdGQ+XG4gICAgICAgICR7ZW1wdHlDb2xzKDMpfVxuICAgICAgPC90cj5cbiAgICAgIDx0ciBzdHlsZT1cIiR7c3R5bGVzLmludm9pY2VEZXRhaWxzfVwiPlxuICAgICAgICA8dGQ+PHN0cm9uZz5JTlZPSUNJTkcgREVUQUlMUzwvc3Ryb25nPjwvdGQ+XG4gICAgICAgIDx0ZCBjb2xzcGFuPVwiM1wiPjxzdHJvbmc+REVTQ1JJUFRJT04gT1ZFUlZJRVc8L3N0cm9uZz48L3RkPlxuICAgICAgICA8dGQ+PHN0cm9uZz5BTU9VTlQ8L3N0cm9uZz48L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkIHN0eWxlPVwiJHtzdHlsZXMuZmFkZWR9XCI+PGVtPkl0ZW0gMTwvZW0+PC90ZD5cbiAgICAgICAgPHRkIHN0eWxlPVwiJHtzdHlsZXMuZmFkZWR9XCIgY29sc3Bhbj1cIjNcIj48ZW0+aS5lLiBUcmFpbmluZyBIb3VyczwvZW0+PC90ZD5cbiAgICAgICAgPHRkIHN0eWxlPVwiJHtzdHlsZXMuYWxpZ25GaXh9ICR7c3R5bGVzLmZhZGVkfVwiPjxzdHJvbmc+JDAuMDA8L3N0cm9uZz48L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkPjxlbT5JdGVtIDI8L2VtPjwvdGQ+XG4gICAgICAgIDx0ZCBjb2xzcGFuPVwiM1wiPjxlbT5pLmUuIEFkdmlzb3IgU2hpZnRzPC9lbT48L3RkPlxuICAgICAgICA8dGQgc3R5bGU9XCIke3N0eWxlcy5hbGlnbkZpeH1cIj48c3Ryb25nPiQke3RvdGFsQW1vdW50fTwvc3Ryb25nPjwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQgc3R5bGU9XCIke3N0eWxlcy5mYWRlZH1cIj48ZW0+SXRlbSAzPC9lbT48L3RkPlxuICAgICAgICA8dGQgc3R5bGU9XCIke3N0eWxlcy5mYWRlZH1cIiBjb2xzcGFuPVwiM1wiPjxlbT5pLmUuIENvbnRlbnQgSG91cnM8L2VtPjwvdGQ+XG4gICAgICAgIDx0ZCBzdHlsZT1cIiR7c3R5bGVzLmFsaWduRml4fSAke3N0eWxlcy5mYWRlZH1cIj48c3Ryb25nPiQwLjAwPC9zdHJvbmc+PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHIgc3R5bGU9XCIke3N0eWxlcy5hbW91bnRSZXF1ZXN0ZWR9XCI+XG4gICAgICAgIDx0ZCBjb2xzcGFuPVwiNFwiPjxzdHJvbmc+VE9UQUwgQU1PVU5UIFJFUVVFU1RFRCAoJCk8L3N0cm9uZz48L3RkPlxuICAgICAgICA8dGQgc3R5bGU9XCIke3N0eWxlcy5hbGlnbkZpeH1cIj48c3Ryb25nPiQke3RvdGFsQW1vdW50fTwvc3Ryb25nPjwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgJHtlbXB0eVJvdygpfVxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+PHN0cm9uZz5JTlZPSUNFIFBFUklPRDwvc3Ryb25nPjwvdGQ+XG4gICAgICAgICR7ZW1wdHlDb2xzKDMpfVxuICAgICAgICA8dGQ+PHN0cm9uZz4ke3N0YXJ0RGF0ZX0gLSAke2VuZERhdGV9PC9zdHJvbmc+PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD48c3Ryb25nPkRVRSBEQVRFPC9zdHJvbmc+PC90ZD5cbiAgICAgICAgJHtlbXB0eUNvbHMoMyl9XG4gICAgICAgIDx0ZCBzdHlsZT1cIiR7c3R5bGVzLmFsaWduRml4fVwiPjxzdHJvbmc+JHtuZXcgRGF0ZSgpLnRvTG9jYWxlRGF0ZVN0cmluZygpfTwvc3Ryb25nPjwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+PHN0cm9uZz5UT1RBTCBIT1VSUyBXT1JLRUQ8L3N0cm9uZz48L3RkPlxuICAgICAgICAke2VtcHR5Q29scygzKX1cbiAgICAgICAgPHRkIHN0eWxlPVwiJHtzdHlsZXMuYWxpZ25GaXh9XCI+PHN0cm9uZz4ke2hvdXJzTnVtfTwvc3Ryb25nPjwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+PHN0cm9uZz5IT1VSTFkgUkFURSAoJC9IUik8L3N0cm9uZz48L3RkPlxuICAgICAgICAke2VtcHR5Q29scygzKX1cbiAgICAgICAgPHRkPjxzdHJvbmc+JDE1LjAwL0hSPC9zdHJvbmc+PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZD48c3Ryb25nPkRFU0NSSVBUSU9OIE9GIFNFUlZJQ0VTPC9zdHJvbmc+PC90ZD5cbiAgICAgICAgJHtlbXB0eUNvbHMoMyl9XG4gICAgICAgIDx0ZD48c3Ryb25nPkNvZGVjYWRlbXkgQ29uc3VsdGFudDwvc3Ryb25nPjwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQ+PHN0cm9uZz5NQU5BR0VSPC9zdHJvbmc+PC90ZD5cbiAgICAgICAgJHtlbXB0eUNvbHMoMyl9XG4gICAgICAgIDx0ZD48c3Ryb25nPkRhbmllbGxhIEtpc3phPC9zdHJvbmc+PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICAke2VtcHR5Um93KCl9XG4gICAgICA8dHIgc3R5bGU9XCIke3N0eWxlcy5zaGlmdEluZm99XCI+XG4gICAgICAgICR7ZW1wdHlDb2xzKDEpfVxuICAgICAgICA8dGQgY29sc3Bhbj1cIjFcIj48c3Ryb25nPkRFVEFJTEVEIERFU0NSSVBUSU9OPC9zdHJvbmc+PC90ZD5cbiAgICAgICAgPHRkPjxzdHJvbmc+REFURTwvc3Ryb25nPjwvdGQ+XG4gICAgICAgIDx0ZD48c3Ryb25nPlRJTUU8L3N0cm9uZz48L3RkPlxuICAgICAgICA8dGQ+PHN0cm9uZz5IT1VSUzwvc3Ryb25nPjwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgJHtnZXRTaGlmdFJvd3Moc2hpZnRzKX1cbiAgICA8L3RhYmxlPlxuICBgXG5cbiAgY29uc3QgdGFibGUgPSB7IHRlbXBsYXRlLCB3b3Jrc2hlZXQgfVxuXG4gIHJldHVybiB0YWJsZVxufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIEhUTUwgdGFibGUgdG8gYW4gZXhjZWwgc2hlZXRcbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRhYmxlLnRlbXBsYXRlXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHRhYmxlLndvcmtzaGVldFxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiB0YWJsZVRvRXhjZWwoeyB0ZW1wbGF0ZSwgd29ya3NoZWV0IH0pIHtcbiAgY29uc3QgYmFzZTY0ID0gcyA9PiB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQocykpKVxuICBjb25zdCB1cmkgPSAnZGF0YTphcHBsaWNhdGlvbi92bmQubXMtZXhjZWw7YmFzZTY0LCdcbiAgY29uc3QgZXhjZWxUZW1wbGF0ZSA9IGA8aHRtbCB4bWxuczpvPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTpvZmZpY2U6b2ZmaWNlXCIgeG1sbnM6eD1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206b2ZmaWNlOmV4Y2VsXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMtaHRtbDQwXCI+PGhlYWQ+PCEtLVtpZiBndGUgbXNvIDldPjx4bWw+PHg6RXhjZWxXb3JrYm9vaz48eDpFeGNlbFdvcmtzaGVldHM+PHg6RXhjZWxXb3Jrc2hlZXQ+PHg6TmFtZT4ke3dvcmtzaGVldH08L3g6TmFtZT48eDpXb3Jrc2hlZXRPcHRpb25zPjx4OkRpc3BsYXlHcmlkbGluZXMvPjwveDpXb3Jrc2hlZXRPcHRpb25zPjwveDpFeGNlbFdvcmtzaGVldD48L3g6RXhjZWxXb3Jrc2hlZXRzPjwveDpFeGNlbFdvcmtib29rPjwveG1sPjwhW2VuZGlmXS0tPjwvaGVhZD48Ym9keT48dGFibGU+JHt0ZW1wbGF0ZX08L3RhYmxlPjwvYm9keT48L2h0bWw+YFxuXG4gIHJldHVybiB1cmkgKyBiYXNlNjQoZXhjZWxUZW1wbGF0ZSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlU3ByZWFkc2hlZXRcbiIsImltcG9ydCBjcmVhdGVTcHJlYWRzaGVldCBmcm9tICcuL2NyZWF0ZS1zcHJlYWRzaGVldCdcblxuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXNwb25zZSwgXywgc2VuZFJlc3BvbnNlKSA9PiB7XG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFsnYWRkcmVzcycsICdlbWFpbCddLCBkYXRhID0+IHtcbiAgICBjb25zdCBpbnZvaWNlRGF0YSA9IE9iamVjdC5hc3NpZ24ocmVzcG9uc2UsIGRhdGEpXG4gICAgY29uc3QgdXJsID0gY3JlYXRlU3ByZWFkc2hlZXQoaW52b2ljZURhdGEpXG4gICAgY29uc3QgZmlsZW5hbWUgPSBgJHtyZXNwb25zZS51c2VyTmFtZS5zcGxpdCgnICcpLmpvaW4oJy0nKX0taW52b2ljZS54bHNgXG5cbiAgICBjaHJvbWUuZG93bmxvYWRzLmRvd25sb2FkKHsgZmlsZW5hbWUsIHVybCB9KVxuICB9KVxufSlcbiIsImNvbnN0IGNvbG9ycyA9IHtcbiAgcmVkOiAnI0UyNjU2MycsXG4gIHBpbms6ICcjRUM5ODk4JyxcbiAgZ3JheTogJ2dyYXknLFxuICBkYXJrR3JheTogJyNEOUQ5RDknLFxuICBsaWdodEdyYXk6ICcjRUZFRkVGJyxcbiAgbWlkR3JheTogJyNDQ0NDQ0MnXG59XG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgdGFibGU6ICd0ZXh0LWFsaWduOiBsZWZ0OyBmb250LXNpemU6IDdweDsgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmOyBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlOycsXG4gIHRvcEhlYWRlcjogYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnJlZH07YCxcbiAgc3ViSGVhZGVyczoge1xuICAgIHRvcDogYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLnBpbmt9O2AsXG4gICAgYm90dG9tOiBgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCAke2NvbG9ycy5ncmF5fTsgYmFja2dyb3VuZC1jb2xvcjogJHtjb2xvcnMucGlua307YFxuICB9LFxuICBpbnZvaWNlRGV0YWlsczogYGJhY2tncm91bmQtY29sb3I6ICR7Y29sb3JzLmRhcmtHcmF5fTtgLFxuICBmYWRlZDogYGNvbG9yOiAke2NvbG9ycy5ncmF5fTtgLFxuICBhbW91bnRSZXF1ZXN0ZWQ6IGBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5saWdodEdyYXl9O2AsXG4gIGFsaWduRml4OiAndGV4dC1hbGlnbjogbGVmdDsnLFxuICBzaGlmdEluZm86IGBiYWNrZ3JvdW5kLWNvbG9yOiAke2NvbG9ycy5taWRHcmF5fTsgdGV4dC1hbGlnbjogbGVmdDtgXG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlc1xuIiwiaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlcydcblxuLyoqXG4gKiBEeW5hbWljYWxseSBjcmVhdGVzIHRoZSByb3dzIG9mIGVhY2hcbiAqIGluZGl2aWR1YWwgc2hpZnQgZW50cnlcbiAqXG4gKiBAcGFyYW0gIHthcnJheX0gc2hpZnRzXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldFNoaWZ0Um93cyhzaGlmdHMpIHtcbiAgbGV0IHNoaWZ0Um93cyA9ICcnXG5cbiAgc2hpZnRzLmZvckVhY2goKHNoaWZ0LCBpKSA9PiB7XG4gICAgY29uc3QgeyBkYXRlLCBzdGFydFRpbWUsIGVuZFRpbWUsIGR1cmF0aW9uIH0gPSBzaGlmdFxuXG4gICAgc2hpZnRSb3dzICs9IGBcbiAgICAgIDx0ciBzdHlsZT1cIiR7c3R5bGVzLmFsaWduRml4fVwiPlxuICAgICAgICAke2VtcHR5Q29scygxKX1cbiAgICAgICAgPHRkPlNoaWZ0ICR7aSArIDF9PC90ZD5cbiAgICAgICAgPHRkPiR7ZGF0ZX08L3RkPlxuICAgICAgICA8dGQ+JHtzdGFydFRpbWV9IC0gJHtlbmRUaW1lfTwvdGQ+XG4gICAgICAgIDx0ZD4ke2R1cmF0aW9ufTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIGBcbiAgfSlcblxuICByZXR1cm4gc2hpZnRSb3dzXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlbXB0eSByb3cgaW4gdGhlIHRlbXBsYXRlXG4gKlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbXB0eVJvdygpIHtcbiAgcmV0dXJuIGBcbiAgICA8dHI+XG4gICAgICA8dGQ+PC90ZD5cbiAgICAgIDx0ZD48L3RkPlxuICAgICAgPHRkPjwvdGQ+XG4gICAgICA8dGQ+PC90ZD5cbiAgICAgIDx0ZD48L3RkPlxuICAgIDwvdHI+XG4gIGBcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZ2l2ZW4gYW1vdW50IG9mIGNvbHVtbnNcbiAqXG4gKiBAcGFyYW0gIHtudW1iZXJ9IG51bU9mQ29sc1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlbXB0eUNvbHMobnVtT2ZDb2xzKSB7XG4gIHJldHVybiAnPHRkPjwvdGQ+Jy5yZXBlYXQobnVtT2ZDb2xzKVxufVxuXG5leHBvcnQge1xuICBnZXRTaGlmdFJvd3MsXG4gIGVtcHR5Um93LFxuICBlbXB0eUNvbHNcbn1cbiJdfQ==
