import XLSX from 'xlsx';

/* 
  备注：直接传入表格的 columns  和 data即可

  header: [{dataIndex: 'site', title: '地点'}]      string Array    标题
  body: [{time: '3点', site: '青岛'}]       object Array    数据
  name: '数据导出'                          string          文件名
*/
export function expoerExcel(header = [], body = [], name = '') {
  // 处理标题
  const dataSource = [], r1 = [];
  header.forEach(item => {
    r1.push(item.title)
  })
  dataSource.push(r1)

  // 处理数据
  body.forEach(b => {
    let r = [];
    header.forEach(h => {
      r.push(b[h.dataIndex])
    })
    dataSource.push(r)
  })

  const worksheet = XLSX.utils.aoa_to_sheet(dataSource);
  const new_workbook = XLSX.utils.book_new();  
  XLSX.utils.book_append_sheet(new_workbook, worksheet, 'sheet1');
  XLSX.writeFile(new_workbook, `${name || '导出报表'}.xlsx`);
}