const $ = selector => document.querySelector(selector)
const $save = $('#save')
const $reset = $('#reset')
const $status = $('#status')
const $email = $('#email')
const $address = $('#address')

$save.addEventListener('click', () => {
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

$reset.addEventListener('click', () => {
  chrome.storage.sync.set({ address: '', email: '' })
  $status.style.color = 'blue'
  $status.textContent = 'All settings have been reset!'
})
