import { $userName, $startDate, $endDate, $tableContainer } from './nodes'

function getInvoiceData() {
  const shifts = []
  const $table = $tableContainer.children[0]
  const $tbody = $table.getElementsByTagName('tbody')[0]
  const rows = Array.from($tbody.getElementsByTagName('tr'))

  // Iterate through all the rows in the table,
  // and push each entry to the shifts array
  rows.forEach(row => {
    const shiftCells = Array.from(row.getElementsByTagName('td')).slice(4)
    const shiftText = shiftCells.map(cell => cell.textContent)
    const [ date, startTime, endTime, duration ] = shiftText

    const shift = {
      date,
      startTime,
      endTime,
      duration
    }

    shifts.push(shift)
  })

  // Get the other necessary information for the invoice
  const invoiceInfo = [$userName, $startDate, $endDate]
  const invoiceText = invoiceInfo.map(node => node.textContent || node.value)
  const [ userName, startDate, endDate ] = invoiceText

  // Combine all the necessary information into an object to be returned
  const invoiceData = {
    userName,
    startDate,
    endDate,
    shifts
  }

  return invoiceData
}

export default getInvoiceData
