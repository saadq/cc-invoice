import { $userName, $startDate, $endDate, $tableContainer } from './nodes'

function getInvoiceData() {
  // Shifts array to hold info for each individual shift
  const shifts = []

  // Get necessary DOM stuff from the table
  // that was dynamically generated
  const $table = $tableContainer.children[0]
  const $tbody = $table.getElementsByTagName('tbody')[0]
  const $tfoot = $table.getElementsByTagName('tfoot')[0]
  const $totalHours = $tfoot.getElementsByTagName('td')[1]
  const rows = Array.from($tbody.getElementsByTagName('tr'))

  // Iterate through all the rows in the table,
  // and push each entry to the shifts array
  rows.forEach(row => {
    const shiftCells = Array.from(row.getElementsByTagName('td')).slice(4)
    const shiftText = shiftCells.map(cell => cell.textContent)
    const [ date, startTime, endTime, duration ] = shiftText

    if (!duration) {
      return
    }

    const shift = {
      date,
      startTime,
      endTime,
      duration
    }

    shifts.push(shift)
  })

  // Get the other necessary information for the invoice
  const invoiceInfo = [$userName, $totalHours, $startDate, $endDate]
  const invoiceText = invoiceInfo.map(node => node.textContent || node.value)
  const [ userName, totalHours, startDate, endDate ] = invoiceText

  // Combine all the necessary information into an object to be returned
  const invoiceData = {
    userName,
    totalHours,
    startDate,
    endDate,
    shifts
  }

  return invoiceData
}

export default getInvoiceData
