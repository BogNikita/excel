import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@/core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options
    });
  }
  init() {
    super.init();
    this.$formula = this.$root.find('.excel__formula-input');
    this.$on('Table:select', $cell => {
      this.$formula.text($cell.text());
    });
    this.$on('Table:input', $cell => {
      this.$formula.text($cell);
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
    this.$emit('Formula:input', $(event.target).text());
  }
  onClick(event) {
    console.log(event);
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
