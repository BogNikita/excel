import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@/core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }
  init() {
    super.init();
    this.$formula = this.$root.find('.excel__formula-input');
    this.$on('Table:select', $cell => {
      this.$formula.text($cell.data.value || $cell.text());
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
  storeChanged({currentText}) {
    this.$formula.text(currentText);
  }
  onInput(event) {
    this.$emit('Formula:input', $(event.target).text());
  }
  onKeydown(event) {
    const {key} = event;
    const keys = ['Enter', 'Tab'];
    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('Formula:focus');
    }
  }
}
