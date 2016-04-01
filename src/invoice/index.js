import getInvoiceData from './get-invoice-data'
import { $invoiceButton, $getRecordsButton } from './nodes'

$getRecordsButton.addEventListener('click', () => {
  $getRecordsButton.parentNode.appendChild($invoiceButton)
})

$invoiceButton.addEventListener('click', () => {
  const invoiceData = getInvoiceData()
  chrome.runtime.sendMessage(invoiceData)
})
