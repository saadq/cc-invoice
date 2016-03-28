import { tableContainer } from './nodes'

function getShifts() {
  const table = tableContainer.children[0]
  const tBody = table.getElementsByTagName('tbody')[0]
  const rows = Array.from(tBody.getElementsByTagName('tr'))

  rows.forEach(row => {
    console.log(row)
  })

  const durationIndex = 8
}

export default getShifts
