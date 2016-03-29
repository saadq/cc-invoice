import { tableContainer } from './nodes'

function getShifts() {
  const shifts = []
  const table = tableContainer.children[0]
  const tbody = table.getElementsByTagName('tbody')[0]
  const rows = Array.from(tbody.getElementsByTagName('tr'))

  rows.forEach(row => {
    const cells = Array.from(row.getElementsByTagName('td'))
    const [ date, clockIn, clockOut, duration ] = cells.slice(4)

    const shift = {
      date: date.textContent,
      clockIn: clockIn.textContent,
      clockOut: clockOut.textContent,
      duration: duration.textContent
    }

    shifts.push(shift)
  })

  return shifts
}

export default getShifts
