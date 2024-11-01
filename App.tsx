import * as React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPaperPlane, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faGaugeHigh} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import {faCodePullRequest} from '@fortawesome/free-solid-svg-icons';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTrash,
  faGaugeHigh,
  faUser,
  faCalendarDays,
  faTriangleExclamation,
  faPaperPlane,
  faHouse,
  faCodePullRequest,
  faChartSimple,
  faBell,
  faArrowRight,
  faPlus,
  faCalendar,
  faMagnifyingGlass,
  faAngleDown,
  faUsers,
  faCircleUser,
  faCircleCheck,
  faCircleXmark,
);
import Providers from './src/navigation';

function App() {
  return <Providers />;
}

export default App;
