import styles from './styles'

/**
 * Dynamically creates the rows of each
 * individual shift entry
 *
 * @param  {array} shifts
 * @return {string}
 */
function getShiftRows(shifts) {
  let shiftRows = ''

  shifts.forEach((shift, i) => {
    const { date, startTime, endTime, duration } = shift

    shiftRows += `
      <tr style="${styles.alignFix}">
        ${emptyCols(1)}
        <td>Shift ${i + 1}</td>
        <td>${date}</td>
        <td>${startTime} - ${endTime}</td>
        <td>${duration}</td>
      </tr>
    `
  })

  return shiftRows
}

/**
 * Creates an empty row in the template
 *
 * @return {string}
 */
function emptyRow() {
  return `
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  `
}

/**
 * Creates a given amount of columns
 *
 * @param  {number} numOfCols
 * @return {string}
 */
function emptyCols(numOfCols) {
  return '<td></td>'.repeat(numOfCols)
}

export {
  getShiftRows,
  emptyRow,
  emptyCols
}
