import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }
  toHTML() {
    return `
    <div class="excel__formula-info">
      fx

    </div>

    <div class="excel__formula-input" contenteditable spellcheck="false">


    </div>
    `;
  }
  onInput(event) {
    console.log(event.target.textContent);
  }
  onClick(event) {
    console.log(event);
  }
}
