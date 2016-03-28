function $(selector) {
  return selector.startsWith('#')
    ? document.getElementById(selector.slice(1))
    : document.querySelectorAll(selector)
}

const tableContainer = $('#manage-records-container')
const buttonRow = $('.right')[0]
const getRecordsButton = $('#get-records')

const invoiceButton = document.createElement('a')
invoiceButton.classList.add('sm-orbutton')
invoiceButton.textContent = 'Generate Invoice'

export {
  tableContainer,
  buttonRow,
  getRecordsButton,
  invoiceButton
}
