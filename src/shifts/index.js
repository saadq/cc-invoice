import getInvoiceData from './get-invoice-data'
import { $invoiceButton, $getRecordsButton } from './nodes'

// When the Get Records button is pressed,
// insert the Invoice Button next to it
$getRecordsButton.addEventListener('click', () => {
  $getRecordsButton.parentNode.appendChild($invoiceButton)
})

// Send the necessary invoice data to a
// background script which will create a spreadsheet
$invoiceButton.addEventListener('click', () => {
  const invoiceData = getInvoiceData()
  chrome.runtime.sendMessage(invoiceData, res => {
    console.log(res || 'ERROR')
  })
})
