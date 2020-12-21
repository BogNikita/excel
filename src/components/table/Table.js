/* eslint-disable max-len */
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from './table.resize';
import {isCell, matrix, shouldResize, nextSelector} from './table.function';
import {TableSelection} from './TableSelection';
import {$} from '@/core/dom';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constans';
import {parse} from '@core/parse';
export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }
  toHTML() {
    return createTable(25, this.store.getState());
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"');
    this.selectCell($cell);
    this.$on('Formula:input', text => {
      if (text) {
        this.selection.current
            .attr('data-value', text)
            .text(parse(text));
        this.updateTextInStore(text);
      }
    });
    this.$on('Formula:focus', () => {
      this.selection.current.focus();
    });
    this.$on('Toolbaer:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectIds
      }));
    });
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }
  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error', e.message);
    }
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map( id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown'
    ];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }
  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: value
    }));
  }
}


