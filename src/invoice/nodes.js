// Alias for querySelectorAll/getElementById
const $ = selector =>
  selector.startsWith('#')
    ? document.getElementById(selector.slice(1))
    : document.querySelectorAll(selector)

const $userName = $('.user-name')[0]
const $totalHours = $('tfoot td:nth-child(2)')[0]
const $startDate = $('#records-from-date')
const $endDate = $('#records-to-date')
const $tableContainer = $('#manage-records-container')
const $getRecordsButton = $('#get-records')

const $invoiceButton = document.createElement('a')
$invoiceButton.classList.add('sm-orbutton')
$invoiceButton.textContent = 'Generate Invoice'

export {
  $userName,
  $totalHours,
  $startDate,
  $endDate,
  $tableContainer,
  $getRecordsButton,
  $invoiceButton
}
