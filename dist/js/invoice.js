(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _nodes = require('./nodes');

function getInvoiceData() {
  var shifts = [];

  var $table = _nodes.$tableContainer.children[0];
  var $tbody = $table.getElementsByTagName('tbody')[0];
  var $tfoot = $table.getElementsByTagName('tfoot')[0];
  var $totalHours = $tfoot.getElementsByTagName('td')[1];
  var rows = Array.from($tbody.getElementsByTagName('tr'));

  rows.forEach(function (row) {
    var shiftCells = Array.from(row.getElementsByTagName('td')).slice(4);
    var shiftText = shiftCells.map(function (cell) {
      return cell.textContent;
    });

    var _shiftText = _slicedToArray(shiftText, 4);

    var date = _shiftText[0];
    var startTime = _shiftText[1];
    var endTime = _shiftText[2];
    var duration = _shiftText[3];


    if (!duration) {
      return;
    }

    var shift = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      duration: duration
    };

    shifts.push(shift);
  });

  var invoiceInfo = [_nodes.$userName, $totalHours, _nodes.$startDate, _nodes.$endDate];
  var invoiceText = invoiceInfo.map(function (node) {
    return node.textContent || node.value;
  });

  var _invoiceText = _slicedToArray(invoiceText, 4);

  var userName = _invoiceText[0];
  var totalHours = _invoiceText[1];
  var startDate = _invoiceText[2];
  var endDate = _invoiceText[3];


  var invoiceData = {
    userName: userName,
    totalHours: totalHours,
    startDate: startDate,
    endDate: endDate,
    shifts: shifts
  };

  return invoiceData;
}

exports.default = getInvoiceData;
module.exports = exports['default'];

},{"./nodes":3}],2:[function(require,module,exports){
'use strict';

var _getInvoiceData = require('./get-invoice-data');

var _getInvoiceData2 = _interopRequireDefault(_getInvoiceData);

var _nodes = require('./nodes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_nodes.$getRecordsButton.addEventListener('click', function () {
  _nodes.$getRecordsButton.parentNode.appendChild(_nodes.$invoiceButton);
});

_nodes.$invoiceButton.addEventListener('click', function () {
  var invoiceData = (0, _getInvoiceData2.default)();
  chrome.runtime.sendMessage(invoiceData);
});

},{"./get-invoice-data":1,"./nodes":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Alias for querySelectorAll/getElementById
var $ = function $(selector) {
  return selector.startsWith('#') ? document.getElementById(selector.slice(1)) : document.querySelectorAll(selector);
};

var $userName = $('.user-name')[0];
var $totalHours = $('tfoot td:nth-child(2)')[0];
var $startDate = $('#records-from-date');
var $endDate = $('#records-to-date');
var $tableContainer = $('#manage-records-container');
var $getRecordsButton = $('#get-records');

var $invoiceButton = document.createElement('a');
$invoiceButton.classList.add('sm-orbutton');
$invoiceButton.textContent = 'Generate Invoice';

exports.$userName = $userName;
exports.$totalHours = $totalHours;
exports.$startDate = $startDate;
exports.$endDate = $endDate;
exports.$tableContainer = $tableContainer;
exports.$getRecordsButton = $getRecordsButton;
exports.$invoiceButton = $invoiceButton;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW52b2ljZS9nZXQtaW52b2ljZS1kYXRhLmpzIiwic3JjL2ludm9pY2UvaW5kZXguanMiLCJzcmMvaW52b2ljZS9ub2Rlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FDQUE7O0FBRUEsU0FBUyxjQUFULEdBQTBCO0FBQ3hCLE1BQU0sU0FBUyxFQUFULENBRGtCOztBQUd4QixNQUFNLFNBQVMsdUJBQWdCLFFBQWhCLENBQXlCLENBQXpCLENBQVQsQ0FIa0I7QUFJeEIsTUFBTSxTQUFTLE9BQU8sb0JBQVAsQ0FBNEIsT0FBNUIsRUFBcUMsQ0FBckMsQ0FBVCxDQUprQjtBQUt4QixNQUFNLFNBQVMsT0FBTyxvQkFBUCxDQUE0QixPQUE1QixFQUFxQyxDQUFyQyxDQUFULENBTGtCO0FBTXhCLE1BQU0sY0FBYyxPQUFPLG9CQUFQLENBQTRCLElBQTVCLEVBQWtDLENBQWxDLENBQWQsQ0FOa0I7QUFPeEIsTUFBTSxPQUFPLE1BQU0sSUFBTixDQUFXLE9BQU8sb0JBQVAsQ0FBNEIsSUFBNUIsQ0FBWCxDQUFQLENBUGtCOztBQVN4QixPQUFLLE9BQUwsQ0FBYSxlQUFPO0FBQ2xCLFFBQU0sYUFBYSxNQUFNLElBQU4sQ0FBVyxJQUFJLG9CQUFKLENBQXlCLElBQXpCLENBQVgsRUFBMkMsS0FBM0MsQ0FBaUQsQ0FBakQsQ0FBYixDQURZO0FBRWxCLFFBQU0sWUFBWSxXQUFXLEdBQVgsQ0FBZTthQUFRLEtBQUssV0FBTDtLQUFSLENBQTNCLENBRlk7O29DQUc2QixjQUg3Qjs7UUFHVixxQkFIVTtRQUdKLDBCQUhJO1FBR08sd0JBSFA7UUFHZ0IseUJBSGhCOzs7QUFLbEIsUUFBSSxDQUFDLFFBQUQsRUFBVztBQUNiLGFBRGE7S0FBZjs7QUFJQSxRQUFNLFFBQVE7QUFDWixnQkFEWTtBQUVaLDBCQUZZO0FBR1osc0JBSFk7QUFJWix3QkFKWTtLQUFSLENBVFk7O0FBZ0JsQixXQUFPLElBQVAsQ0FBWSxLQUFaLEVBaEJrQjtHQUFQLENBQWIsQ0FUd0I7O0FBNEJ4QixNQUFNLGNBQWMsbUJBQVksV0FBWixxQ0FBZCxDQTVCa0I7QUE2QnhCLE1BQU0sY0FBYyxZQUFZLEdBQVosQ0FBZ0I7V0FBUSxLQUFLLFdBQUwsSUFBb0IsS0FBSyxLQUFMO0dBQTVCLENBQTlCLENBN0JrQjs7b0NBOEI2QixnQkE5QjdCOztNQThCaEIsMkJBOUJnQjtNQThCTiw2QkE5Qk07TUE4Qk0sNEJBOUJOO01BOEJpQiwwQkE5QmpCOzs7QUFnQ3hCLE1BQU0sY0FBYztBQUNsQixzQkFEa0I7QUFFbEIsMEJBRmtCO0FBR2xCLHdCQUhrQjtBQUlsQixvQkFKa0I7QUFLbEIsa0JBTGtCO0dBQWQsQ0FoQ2tCOztBQXdDeEIsU0FBTyxXQUFQLENBeEN3QjtDQUExQjs7a0JBMkNlOzs7Ozs7QUM3Q2Y7Ozs7QUFDQTs7OztBQUVBLHlCQUFrQixnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBNEMsWUFBTTtBQUNoRCwyQkFBa0IsVUFBbEIsQ0FBNkIsV0FBN0Isd0JBRGdEO0NBQU4sQ0FBNUM7O0FBSUEsc0JBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsWUFBTTtBQUM3QyxNQUFNLGNBQWMsK0JBQWQsQ0FEdUM7QUFFN0MsU0FBTyxPQUFQLENBQWUsV0FBZixDQUEyQixXQUEzQixFQUY2QztDQUFOLENBQXpDOzs7Ozs7Ozs7QUNOQSxJQUFNLElBQUksU0FBSixDQUFJO1NBQ1IsU0FBUyxVQUFULENBQW9CLEdBQXBCLElBQ0ksU0FBUyxjQUFULENBQXdCLFNBQVMsS0FBVCxDQUFlLENBQWYsQ0FBeEIsQ0FESixHQUVJLFNBQVMsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FGSjtDQURROztBQUtWLElBQU0sWUFBWSxFQUFFLFlBQUYsRUFBZ0IsQ0FBaEIsQ0FBWjtBQUNOLElBQU0sY0FBYyxFQUFFLHVCQUFGLEVBQTJCLENBQTNCLENBQWQ7QUFDTixJQUFNLGFBQWEsRUFBRSxvQkFBRixDQUFiO0FBQ04sSUFBTSxXQUFXLEVBQUUsa0JBQUYsQ0FBWDtBQUNOLElBQU0sa0JBQWtCLEVBQUUsMkJBQUYsQ0FBbEI7QUFDTixJQUFNLG9CQUFvQixFQUFFLGNBQUYsQ0FBcEI7O0FBRU4sSUFBTSxpQkFBaUIsU0FBUyxhQUFULENBQXVCLEdBQXZCLENBQWpCO0FBQ04sZUFBZSxTQUFmLENBQXlCLEdBQXpCLENBQTZCLGFBQTdCO0FBQ0EsZUFBZSxXQUFmLEdBQTZCLGtCQUE3Qjs7UUFHRTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyAkdXNlck5hbWUsICRzdGFydERhdGUsICRlbmREYXRlLCAkdGFibGVDb250YWluZXIgfSBmcm9tICcuL25vZGVzJ1xuXG5mdW5jdGlvbiBnZXRJbnZvaWNlRGF0YSgpIHtcbiAgY29uc3Qgc2hpZnRzID0gW11cblxuICBjb25zdCAkdGFibGUgPSAkdGFibGVDb250YWluZXIuY2hpbGRyZW5bMF1cbiAgY29uc3QgJHRib2R5ID0gJHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0Ym9keScpWzBdXG4gIGNvbnN0ICR0Zm9vdCA9ICR0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGZvb3QnKVswXVxuICBjb25zdCAkdG90YWxIb3VycyA9ICR0Zm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGQnKVsxXVxuICBjb25zdCByb3dzID0gQXJyYXkuZnJvbSgkdGJvZHkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyJykpXG5cbiAgcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgY29uc3Qgc2hpZnRDZWxscyA9IEFycmF5LmZyb20ocm93LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd0ZCcpKS5zbGljZSg0KVxuICAgIGNvbnN0IHNoaWZ0VGV4dCA9IHNoaWZ0Q2VsbHMubWFwKGNlbGwgPT4gY2VsbC50ZXh0Q29udGVudClcbiAgICBjb25zdCBbIGRhdGUsIHN0YXJ0VGltZSwgZW5kVGltZSwgZHVyYXRpb24gXSA9IHNoaWZ0VGV4dFxuXG4gICAgaWYgKCFkdXJhdGlvbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3Qgc2hpZnQgPSB7XG4gICAgICBkYXRlLFxuICAgICAgc3RhcnRUaW1lLFxuICAgICAgZW5kVGltZSxcbiAgICAgIGR1cmF0aW9uXG4gICAgfVxuXG4gICAgc2hpZnRzLnB1c2goc2hpZnQpXG4gIH0pXG5cbiAgY29uc3QgaW52b2ljZUluZm8gPSBbJHVzZXJOYW1lLCAkdG90YWxIb3VycywgJHN0YXJ0RGF0ZSwgJGVuZERhdGVdXG4gIGNvbnN0IGludm9pY2VUZXh0ID0gaW52b2ljZUluZm8ubWFwKG5vZGUgPT4gbm9kZS50ZXh0Q29udGVudCB8fCBub2RlLnZhbHVlKVxuICBjb25zdCBbIHVzZXJOYW1lLCB0b3RhbEhvdXJzLCBzdGFydERhdGUsIGVuZERhdGUgXSA9IGludm9pY2VUZXh0XG5cbiAgY29uc3QgaW52b2ljZURhdGEgPSB7XG4gICAgdXNlck5hbWUsXG4gICAgdG90YWxIb3VycyxcbiAgICBzdGFydERhdGUsXG4gICAgZW5kRGF0ZSxcbiAgICBzaGlmdHNcbiAgfVxuXG4gIHJldHVybiBpbnZvaWNlRGF0YVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRJbnZvaWNlRGF0YVxuIiwiaW1wb3J0IGdldEludm9pY2VEYXRhIGZyb20gJy4vZ2V0LWludm9pY2UtZGF0YSdcbmltcG9ydCB7ICRpbnZvaWNlQnV0dG9uLCAkZ2V0UmVjb3Jkc0J1dHRvbiB9IGZyb20gJy4vbm9kZXMnXG5cbiRnZXRSZWNvcmRzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAkZ2V0UmVjb3Jkc0J1dHRvbi5wYXJlbnROb2RlLmFwcGVuZENoaWxkKCRpbnZvaWNlQnV0dG9uKVxufSlcblxuJGludm9pY2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNvbnN0IGludm9pY2VEYXRhID0gZ2V0SW52b2ljZURhdGEoKVxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZShpbnZvaWNlRGF0YSlcbn0pXG4iLCIvLyBBbGlhcyBmb3IgcXVlcnlTZWxlY3RvckFsbC9nZXRFbGVtZW50QnlJZFxuY29uc3QgJCA9IHNlbGVjdG9yID0+XG4gIHNlbGVjdG9yLnN0YXJ0c1dpdGgoJyMnKVxuICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc2xpY2UoMSkpXG4gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXG5jb25zdCAkdXNlck5hbWUgPSAkKCcudXNlci1uYW1lJylbMF1cbmNvbnN0ICR0b3RhbEhvdXJzID0gJCgndGZvb3QgdGQ6bnRoLWNoaWxkKDIpJylbMF1cbmNvbnN0ICRzdGFydERhdGUgPSAkKCcjcmVjb3Jkcy1mcm9tLWRhdGUnKVxuY29uc3QgJGVuZERhdGUgPSAkKCcjcmVjb3Jkcy10by1kYXRlJylcbmNvbnN0ICR0YWJsZUNvbnRhaW5lciA9ICQoJyNtYW5hZ2UtcmVjb3Jkcy1jb250YWluZXInKVxuY29uc3QgJGdldFJlY29yZHNCdXR0b24gPSAkKCcjZ2V0LXJlY29yZHMnKVxuXG5jb25zdCAkaW52b2ljZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxuJGludm9pY2VCdXR0b24uY2xhc3NMaXN0LmFkZCgnc20tb3JidXR0b24nKVxuJGludm9pY2VCdXR0b24udGV4dENvbnRlbnQgPSAnR2VuZXJhdGUgSW52b2ljZSdcblxuZXhwb3J0IHtcbiAgJHVzZXJOYW1lLFxuICAkdG90YWxIb3VycyxcbiAgJHN0YXJ0RGF0ZSxcbiAgJGVuZERhdGUsXG4gICR0YWJsZUNvbnRhaW5lcixcbiAgJGdldFJlY29yZHNCdXR0b24sXG4gICRpbnZvaWNlQnV0dG9uXG59XG4iXX0=
