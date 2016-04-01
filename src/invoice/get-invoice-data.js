import { $userName, $startDate, $endDate, $tableContainer } from './nodes'

function getInvoiceData() {
  const shifts = []

  const $table = $tableContainer.children[0]
  const $tbody = $table.getElementsByTagName('tbody')[0]
  const $tfoot = $table.getElementsByTagName('tfoot')[0]
  const $totalHours = $tfoot.getElementsByTagName('td')[1]
  const rows = Array.from($tbody.getElementsByTagName('tr'))

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

  const invoiceInfo = [$userName, $totalHours, $startDate, $endDate]
  const invoiceText = invoiceInfo.map(node => node.textContent || node.value)
  const [ userName, totalHours, startDate, endDate ] = invoiceText

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
