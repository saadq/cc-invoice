const $ = selector => document.querySelector(selector)
const $button = $('#save')
const $status = $('#status')
const $email = $('#email')
const $address = $('#address')

$button.addEventListener('click', () => {
  const email = $email.value
  const address = $address.value

  let message

  if (address && email) {
    chrome.storage.sync.set({ email, address })
    message = 'Your address and email settings have been saved!'
  }

  else if (address) {
    chrome.storage.sync.set({ address })
    message = 'Your address settings have been saved!'
  }

  else if (email) {
    chrome.storage.sync.set({ email })
    message = 'Your email settings have been saved!'
  }

  if (message) {
    $status.style.color = 'green'
    $status.textContent = message
  }
})
