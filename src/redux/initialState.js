import {defaultStyles, defaultTitle} from '@/constans';
const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {},
  currentText: '',
  currentStyles: defaultStyles,
  title: defaultTitle,
  openenDate: new Date().toJSON()
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
});


export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
