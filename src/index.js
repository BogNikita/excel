import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {CreateStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';
import {storage} from '@core/utils';
import './sass/index.sass';
import {initialState} from './redux/initialState';
import {debounce} from './core/utils';

const store = new CreateStore(rootReducer, initialState);

const stateListener = debounce(state => {
  storage('excel-state', state);
}, 300);
store.subscribe(stateListener);
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
});

excel.render();
