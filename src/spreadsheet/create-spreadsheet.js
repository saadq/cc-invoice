const saadTable = `
<table style="text-align: left; font-size: 8px; font-family: Arial, sans-serif; border-collapse: collapse;" border="1">
  <tr>
    <td style="background-color: red;" colspan="5">Please make sure to submit your invoice as a PDF (File > Download As > PDF)</td>
  </tr>
  <tr>
    <td style="background-color: red;" colspan="5"><em>*Invoices should be emailed directly to Codecademy@bill.com or faxed to 646.365.7939</em></td>
  </tr>
  <tr>
    <td style="border-bottom: 10px solid gray; background-color: red;" colspan="5"><em>*If you're a new advisor, please be sure to attach your W-9 form!</em></td>
  </tr>
  <tr>
    <td><strong>To: Codecademy</strong></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><strong>49 West 27th Street - 4th Floor</strong></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><strong>New York, NY 10001</strong></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><strong>YOUR NAME:</strong></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><strong>YOUR EMAIL:</strong></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td><strong>YOUR ADDRESS:</strong></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr style="background-color: gray;">
    <th>INVOICING DETAILS</th>
    <th colspan="3">DESCRIPTION OVERVIEW</th>
    <th>AMOUNT</th>
  </tr>
  <tr>
    <td><em>Item 1</em></td>
    <td colspan="3"><em>i.e. Training Hours</em></td>
    <td><strong>$0.00</strong></td>
  </tr>
  <tr>
    <td><em>Item 2</em></td>
    <td colspan="3"><em>i.e. Advisor Shifts</em></td>
    <td><strong>$0.00</strong></td>
  </tr>
  <tr>
    <td><em>Item 3</em></td>
    <td colspan="3"><em>i.e. Content Hours</em></td>
    <td><strong>$0.00</strong></td>
  </tr>
  <tr style="background-color: #EFEFEF;">
    <td colspan="4"><storng>TOTAL AMOUNT REQUESTED ($)</strong></td>
    <td><strong>$0.00</strong></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>INVOICE PERIOD</td>
    <td></td>
    <td></td>
    <td></td>
    <td><em>2/11-2/24</em></td>
  </tr>
  <tr>
    <td>DUE DATE</td>
    <td></td>
    <td></td>
    <td></td>
    <td style="text-align: left;">${new Date().toLocaleDateString()}</td>
  </tr>
  <tr>
    <td>TOTAL HOURS WORKED</td>
    <td></td>
    <td></td>
    <td></td>
    <td style="text-align: left;">0.00</td>
  </tr>
  <tr>
    <td>HOURLY RATE ($/HR)</td>
    <td></td>
    <td></td>
    <td></td>
    <td>$15.00/HR</td>
  </tr>
  <tr>
    <td>DESCRIPTION OF SERVICES</td>
    <td></td>
    <td></td>
    <td></td>
    <td>Codecademy Consultant</td>
  </tr>
  <tr>
    <td>MANAGER</td>
    <td></td>
    <td></td>
    <td></td>
    <td>Daniella Kisza</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <th></th>
    <th>DETAILED DESCRIPTION</th>
    <th>DATE</th>
    <th>TIME</th>
    <th>HOURS</th>
  </tr>
  <tr>
    <td></td>
    <td>Shift 1</td>
    <td>1/2/2016</td>
    <td>10AM-2PM</td>
    <td>4</td>
  </tr>
  <tr>
    <td></td>
    <td>Shift 1</td>
    <td>1/2/2016</td>
    <td>10AM-2PM</td>
    <td>4</td>
  </tr>
  <tr>
    <td></td>
    <td>Shift 1</td>
    <td>1/2/2016</td>
    <td>10AM-2PM</td>
    <td>4</td>
  </tr>
</table>
`

const tableToExcel = (function() {
  const uri = 'data:application/vnd.ms-excel;base64,'
  const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
  const base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
  const format = function(s, c) { return s.replace(/{(\w+)}/g, (m, p) => c[p]) }
  return function(table, name) {
    const ctx = { worksheet: name || 'Worksheet', table: saadTable }
    return uri + base64(format(template, ctx))
  }
})()

function createSpreadsheet() {
  const url = tableToExcel('testTable', 'Invoice Template')
  return url
}

export default createSpreadsheet
