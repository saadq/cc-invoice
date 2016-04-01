const $ = selector => document.querySelector(selector)
const $button = $('#save')

$button.addEventListener('click', () => {
  const email = $('#email').value
  const address = $('#address').value

  chrome.storage.sync.set({ email, address })
})
