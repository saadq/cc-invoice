import getShifts from './get-shifts'
import { buttonRow, invoiceButton, getRecordsButton } from './nodes'

// When the Get Records button is pressed,
// insert the Invoice Button next to it
getRecordsButton.addEventListener('click', () => {
  buttonRow.appendChild(invoiceButton)
})

// Send the table of shift records to our background script
invoiceButton.addEventListener('click', () => {
  getShifts()
})
