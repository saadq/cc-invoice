import createSpreadsheet from './create-spreadsheet'

chrome.runtime.onMessage.addListener((response, _, sendResponse) => {
  chrome.storage.sync.get(['address', 'email'], data => {
    const invoiceData = Object.assign(response, data)
    const url = createSpreadsheet(invoiceData)
    const filename = `${response.userName.split(' ').join('-')}-invoice.xls`

    chrome.downloads.download({ filename, url })
  })
})
