import createSpreadsheet from './create-spreadsheet'

// Get the invoice info from the content script and
// create a spreadsheet from it which will then be downloaded
chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  const spreadsheetURL = createSpreadsheet(response)
  const spreadsheetName = `${response.userName.split(' ').join('-')}-invoice.xls`

  chrome.downloads.download({
    filename: spreadsheetName,
    url: spreadsheetURL
  })

  sendResponse('Invoice generated.')
})
