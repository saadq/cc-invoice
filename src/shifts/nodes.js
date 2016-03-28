function $(selector) {
  return selector.startsWith('#')
    ? document.querySelector(selector)
    : document.querySelectorAll(selector)
}

const buttonContainer = $('.right')[0]
const getRecordsButton = $('#get-records')

const invoiceButton = document.createElement('a')
invoiceButton.classList.add('sm-orbutton')
invoiceButton.textContent = 'Generate Invoice'

export {
  buttonContainer,
  getRecordsButton,
  invoiceButton
}
