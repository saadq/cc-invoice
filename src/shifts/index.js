import { buttonContainer, invoiceButton, getRecordsButton } from './nodes'

// When the Get Records button is pressed,
// insert the Invoice Button next to it
getRecordsButton.addEventListener('click', () => {
  buttonContainer.appendChild(invoiceButton)
})

invoiceButton.addEventListener('click', () => {
  alert('hi')
})
