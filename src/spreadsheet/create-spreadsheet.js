const saadTable = `
<table border="1">
    <tr>
        <td>Row 2, cell 1</td>
        <td colspan="2">Row 2, cell 2, also spanning Row 2, cell 3</td>
    </tr>
    <tr>
        <td rowspan="2">Row 3, cell 1, also spanning Row 4, cell 1</td>
        <td>Row 3, cell 2</td>
        <td>Row 3, cell 3</td>
    </tr>
    <tr>
        <td>Row 4, cell 2</td>
        <td>Row 4, cell 3</td>
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
