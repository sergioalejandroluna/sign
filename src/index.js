import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { CssBaseline } from 'material-ui';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div>
  <CssBaseline />
  <App />
</div>, document.getElementById('root'));
registerServiceWorker();
