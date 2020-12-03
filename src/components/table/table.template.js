

const CODES = {
  A: 65,
  Z: 90
};

function createCell() {
  return `<div class="cell" contenteditable></div>`;
}

function toColumn(el) {
  return `
    <div class="column"> ${el}</div>
    `;
}

function createRow(content = '', index = '') {
  return `
    <div class="row">
        <div class="row-info">${index}</div>
        <div class="row-data">${content ? content : ''}</div>
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
      .map(createCell)
      .join('');
  const column = new Array(rowsCount)
      .fill(cells)
      .map((el, i) => createRow(cells, i + 1))
      .join('');
  rows.push(column);
  return rows.join('');
}
