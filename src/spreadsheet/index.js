import createSpreadsheet from './create-spreadsheet'

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  const spreadSheetName = 'invoice.xls'
  const spreadsheetURL = createSpreadsheet()

  chrome.downloads.download({
    filename: spreadSheetName,
    url: spreadsheetURL
  })
})
