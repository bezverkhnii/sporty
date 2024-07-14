import * as React from 'react';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faPaperPlane, faTrash} from '@fortawesome/free-solid-svg-icons';
import {faGaugeHigh} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

library.add(
  faTrash,
  faGaugeHigh,
  faUser,
  faCalendarDays,
  faTriangleExclamation,
  faPaperPlane,
);
import Providers from './src/navigation';

function App() {
  return <Providers />;
}

export default App;
