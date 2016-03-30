import { getShiftRows, emptyRow, emptyCols } from './util'
import styles from './styles'

/**
 * Creates a spreadsheet by generating an HTML table
 * and then converting it into an excel document
 *
 * @param  {object} invoiceInfo
 * @return {string}
 */
function createSpreadsheet(invoiceInfo) {
  const table = generateTable(invoiceInfo)
  const url = tableToExcel(table)

  return url
}

/**
 * Generates an HTML table using static information
 * as well as dynamically generating the rest of the
 * invoice by using the invoiceInfo given as input
 *
 * @param {string} invoiceInfo.userName
 * @param {string} invoiceInfo.totalHours
 * @param {string} invoiceInfo.startDate
 * @param {string} invoiceInfo.endDate
 * @param {array}  invoiceInfo.shifts
 * @return {object}
 */
function generateTable({ userName, totalHours, startDate, endDate, shifts }) {
  const worksheet = `${userName} Invoice Template`
  const hoursNum = parseFloat(totalHours).toFixed(2)
  const hourlyRate = 15
  const totalAmount = hoursNum * hourlyRate

  const template = `
    <table style="${styles.table}" cellpadding="2" border="1" bordercolor="EEEEEE">
      <tr>
        <td style="${styles.topHeader}" colspan="5">Please make sure to submit your invoice as a PDF (File > Save As > PDF)</td>
      </tr>
      <tr>
        <td style="${styles.subHeaders.top}" colspan="5"><em>*Invoices should be emailed directly to Codecademy@bill.com or faxed to 646.365.7939</em></td>
      </tr>
      <tr>
        <td style="${styles.subHeaders.bottom}" colspan="5"><em>*If you're a new advisor, please be sure to attach your W-9 form!</em></td>
      </tr>
      <tr>
        <td><strong>To: Codecademy</strong></td>
        ${emptyCols(4)}
      </tr>
      <tr>
        <td><strong>49 West 27th Street - 4th Floor</strong></td>
        ${emptyCols(4)}
      </tr>
      <tr>
        <td><strong>New York, NY 10001</strong></td>
        ${emptyCols(4)}
      </tr>
      ${emptyRow()}
      <tr>
        <td><strong>YOUR NAME:</strong></td>
        <td>${userName}</td>
        ${emptyCols(3)}
      </tr>
      <tr>
        <td><strong>YOUR EMAIL:</strong></td>
        <td>REPLACE THIS FIELD</td>
        ${emptyCols(3)}
      </tr>
      <tr>
        <td><strong>YOUR ADDRESS:</strong></td>
        <td>REPLACE THIS FIELD</td>
        ${emptyCols(3)}
      </tr>
      <tr style="${styles.invoiceDetails}">
        <th>INVOICING DETAILS</th>
        <th colspan="3">DESCRIPTION OVERVIEW</th>
        <th>AMOUNT</th>
      </tr>
      <tr>
        <td style="${styles.faded}"><em>Item 1</em></td>
        <td style="${styles.faded}" colspan="3"><em>i.e. Training Hours</em></td>
        <td style="${styles.faded}"><strong>$0.00</strong></td>
      </tr>
      <tr>
        <td><em>Item 2</em></td>
        <td colspan="3"><em>i.e. Advisor Shifts</em></td>
        <td><strong>$${totalAmount}</strong></td>
      </tr>
      <tr>
        <td style="${styles.faded}"><em>Item 3</em></td>
        <td style="${styles.faded}" colspan="3"><em>i.e. Content Hours</em></td>
        <td style="${styles.faded}"><strong>$0.00</strong></td>
      </tr>
      <tr style="${styles.amountRequested}">
        <td colspan="4"><strong>TOTAL AMOUNT REQUESTED ($)</strong></td>
        <td><strong>$${totalAmount}</strong></td>
      </tr>
      ${emptyRow()}
      <tr>
        <td><strong>INVOICE PERIOD</strong></td>
        ${emptyCols(3)}
        <td><strong>${startDate} – ${endDate}</strong></td>
      </tr>
      <tr>
        <td><strong>DUE DATE</strong></td>
        ${emptyCols(3)}
        <td style="${styles.alignFix}"><strong>${new Date().toLocaleDateString()}</strong></td>
      </tr>
      <tr>
        <td><strong>TOTAL HOURS WORKED</strong></td>
        ${emptyCols(3)}
        <td style="${styles.alignFix}"><strong>${hoursNum}</strong></td>
      </tr>
      <tr>
        <td><strong>HOURLY RATE ($/HR)</strong></td>
        ${emptyCols(3)}
        <td><strong>$15.00/HR</strong></td>
      </tr>
      <tr>
        <td><strong>DESCRIPTION OF SERVICES</strong></td>
        ${emptyCols(3)}
        <td><strong>Codecademy Consultant</strong></td>
      </tr>
      <tr>
        <td><strong>MANAGER</strong></td>
        ${emptyCols(3)}
        <td><strong>Daniella Kisza</strong></td>
      </tr>
      ${emptyRow()}
      <tr style="${styles.shiftInfo}">
        ${emptyCols(1)}
        <th>DETAILED DESCRIPTION</th>
        <th>DATE</th>
        <th>TIME</th>
        <th>HOURS</th>
      </tr>
      ${getShiftRows(shifts)}
    </table>
  `

  const table = { template, worksheet }

  return table
}

function tableToExcel({ template, worksheet }) {
  const base64 = s => window.btoa(unescape(encodeURIComponent(s)))
  const uri = 'data:application/vnd.ms-excel;base64,'
  const excelTemplate = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>${template}</table></body></html>`

  return uri + base64(excelTemplate)
}

export default createSpreadsheet
