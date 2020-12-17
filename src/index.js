
import './sass/index.sass';
import {Router} from '@core/router/Router';
import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';


new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
});


