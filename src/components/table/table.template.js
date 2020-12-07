
const CODES = {
  A: 65,
  Z: 90
};

function createCell(code) {
  return `<div class="cell" contenteditable data-col="${code}"></div>`;
}

function toColumn(el) {
  return `
    <div class="column" data-type="resizable" data-col="${el}"> 
    ${el}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function createRow(content, index) {
  const resizer = index
  ? '<div class="row-resize" data-resize="row"></div>'
  : '';
  const dataRow = index ? `data-row="${index}" data-type="resizable"` : '';
  return `
    <div class="row" ${dataRow}>
        <div class="row-info">${index ? index : '' }
          ${resizer}
        </div>
        <div class="row-data" >${content}</div>
    </div>
    `;
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');
  rows.push(createRow(cols));
  const cells = new Array(colsCount)
      .fill('')
      .map((_, i) => createCell(toChar(_, i)))
      .join('');
  const column = new Array(rowsCount)
      .fill(cells)
      .map((_, i) => createRow(cells, i + 1))
      .join('');
  rows.push(column);
  return rows.join('');
}

