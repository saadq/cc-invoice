import createSpreadsheet from './create-spreadsheet'

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  createSpreadsheet(response)
})
