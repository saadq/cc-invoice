(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $ = function $(selector) {
  return document.querySelector(selector);
};

var $save = $('#save');
var $reset = $('#reset');
var $status = $('#status');
var $email = $('#email');
var $address = $('#address');

$save.addEventListener('click', function () {
  var email = $email.value;
  var address = $address.value;

  var message = void 0;

  if (address && email) {
    chrome.storage.sync.set({ email: email, address: address });
    message = 'Your address and email settings have been saved!';
  } else if (address) {
    chrome.storage.sync.set({ address: address });
    message = 'Your address settings have been saved!';
  } else if (email) {
    chrome.storage.sync.set({ email: email });
    message = 'Your email settings have been saved!';
  }

  if (message) {
    $status.style.color = 'green';
    $status.textContent = message;
  }
});

$reset.addEventListener('click', function () {
  chrome.storage.sync.set({ address: '', email: '' });
  $status.style.color = 'blue';
  $status.textContent = 'All settings have been reset!';
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvcG9wdXAvcG9wdXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQU0sSUFBSSxTQUFKLENBQUk7U0FBWSxTQUFTLGFBQVQsQ0FBdUIsUUFBdkI7Q0FBWjs7QUFFVixJQUFNLFFBQVEsRUFBRSxPQUFGLENBQVI7QUFDTixJQUFNLFNBQVMsRUFBRSxRQUFGLENBQVQ7QUFDTixJQUFNLFVBQVUsRUFBRSxTQUFGLENBQVY7QUFDTixJQUFNLFNBQVMsRUFBRSxRQUFGLENBQVQ7QUFDTixJQUFNLFdBQVcsRUFBRSxVQUFGLENBQVg7O0FBRU4sTUFBTSxnQkFBTixDQUF1QixPQUF2QixFQUFnQyxZQUFNO0FBQ3BDLE1BQU0sUUFBUSxPQUFPLEtBQVAsQ0FEc0I7QUFFcEMsTUFBTSxVQUFVLFNBQVMsS0FBVCxDQUZvQjs7QUFJcEMsTUFBSSxnQkFBSixDQUpvQzs7QUFNcEMsTUFBSSxXQUFXLEtBQVgsRUFBa0I7QUFDcEIsV0FBTyxPQUFQLENBQWUsSUFBZixDQUFvQixHQUFwQixDQUF3QixFQUFFLFlBQUYsRUFBUyxnQkFBVCxFQUF4QixFQURvQjtBQUVwQixjQUFVLGtEQUFWLENBRm9CO0dBQXRCLE1BS0ssSUFBSSxPQUFKLEVBQWE7QUFDaEIsV0FBTyxPQUFQLENBQWUsSUFBZixDQUFvQixHQUFwQixDQUF3QixFQUFFLGdCQUFGLEVBQXhCLEVBRGdCO0FBRWhCLGNBQVUsd0NBQVYsQ0FGZ0I7R0FBYixNQUtBLElBQUksS0FBSixFQUFXO0FBQ2QsV0FBTyxPQUFQLENBQWUsSUFBZixDQUFvQixHQUFwQixDQUF3QixFQUFFLFlBQUYsRUFBeEIsRUFEYztBQUVkLGNBQVUsc0NBQVYsQ0FGYztHQUFYOztBQUtMLE1BQUksT0FBSixFQUFhO0FBQ1gsWUFBUSxLQUFSLENBQWMsS0FBZCxHQUFzQixPQUF0QixDQURXO0FBRVgsWUFBUSxXQUFSLEdBQXNCLE9BQXRCLENBRlc7R0FBYjtDQXJCOEIsQ0FBaEM7O0FBMkJBLE9BQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBTTtBQUNyQyxTQUFPLE9BQVAsQ0FBZSxJQUFmLENBQW9CLEdBQXBCLENBQXdCLEVBQUUsU0FBUyxFQUFULEVBQWEsT0FBTyxFQUFQLEVBQXZDLEVBRHFDO0FBRXJDLFVBQVEsS0FBUixDQUFjLEtBQWQsR0FBc0IsTUFBdEIsQ0FGcUM7QUFHckMsVUFBUSxXQUFSLEdBQXNCLCtCQUF0QixDQUhxQztDQUFOLENBQWpDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0ICQgPSBzZWxlY3RvciA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuXG5jb25zdCAkc2F2ZSA9ICQoJyNzYXZlJylcbmNvbnN0ICRyZXNldCA9ICQoJyNyZXNldCcpXG5jb25zdCAkc3RhdHVzID0gJCgnI3N0YXR1cycpXG5jb25zdCAkZW1haWwgPSAkKCcjZW1haWwnKVxuY29uc3QgJGFkZHJlc3MgPSAkKCcjYWRkcmVzcycpXG5cbiRzYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBjb25zdCBlbWFpbCA9ICRlbWFpbC52YWx1ZVxuICBjb25zdCBhZGRyZXNzID0gJGFkZHJlc3MudmFsdWVcblxuICBsZXQgbWVzc2FnZVxuXG4gIGlmIChhZGRyZXNzICYmIGVtYWlsKSB7XG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoeyBlbWFpbCwgYWRkcmVzcyB9KVxuICAgIG1lc3NhZ2UgPSAnWW91ciBhZGRyZXNzIGFuZCBlbWFpbCBzZXR0aW5ncyBoYXZlIGJlZW4gc2F2ZWQhJ1xuICB9XG5cbiAgZWxzZSBpZiAoYWRkcmVzcykge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgYWRkcmVzcyB9KVxuICAgIG1lc3NhZ2UgPSAnWW91ciBhZGRyZXNzIHNldHRpbmdzIGhhdmUgYmVlbiBzYXZlZCEnXG4gIH1cblxuICBlbHNlIGlmIChlbWFpbCkge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgZW1haWwgfSlcbiAgICBtZXNzYWdlID0gJ1lvdXIgZW1haWwgc2V0dGluZ3MgaGF2ZSBiZWVuIHNhdmVkISdcbiAgfVxuXG4gIGlmIChtZXNzYWdlKSB7XG4gICAgJHN0YXR1cy5zdHlsZS5jb2xvciA9ICdncmVlbidcbiAgICAkc3RhdHVzLnRleHRDb250ZW50ID0gbWVzc2FnZVxuICB9XG59KVxuXG4kcmVzZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgYWRkcmVzczogJycsIGVtYWlsOiAnJyB9KVxuICAkc3RhdHVzLnN0eWxlLmNvbG9yID0gJ2JsdWUnXG4gICRzdGF0dXMudGV4dENvbnRlbnQgPSAnQWxsIHNldHRpbmdzIGhhdmUgYmVlbiByZXNldCEnXG59KVxuIl19
