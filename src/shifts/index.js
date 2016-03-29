import getInvoiceData from './get-invoice-data'
import { $invoiceButton, $getRecordsButton } from './nodes'

// When the Get Records button is pressed,
// insert the Invoice Button next to it
$getRecordsButton.addEventListener('click', () => {
  $getRecordsButton.parentNode.appendChild($invoiceButton)
})

// Send the shift records to the background script
$invoiceButton.addEventListener('click', () => {
  const shifts = getInvoiceData()
  console.log(shifts)
})
