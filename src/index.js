import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Reboot from 'material-ui/Reboot';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div>
    <Reboot />
    <App />
  </div>, document.getElementById('root'));
registerServiceWorker();
