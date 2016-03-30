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
      <tr>
        ${emptyCols(1)}
        <td style="padding: 0 2px;">Shift ${i + 1}</td>
        <td style="padding: 0 2px;">${date}</td>
        <td style="padding: 0 2px;">${startTime} – ${endTime}</td>
        <td style="padding: 0 2px;">${duration}</td>
      </tr>
    `
  })

  return shiftRows
}

/**
 * Creates an empty row in the template
 *
 * @return {void}
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
 * @return {void}
 */
function emptyCols(numOfCols) {
  return '<td></td>'.repeat(numOfCols)
}

export {
  getShiftRows,
  emptyRow,
  emptyCols
}
