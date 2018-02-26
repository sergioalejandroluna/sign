import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Reboot from 'material-ui/Reboot';
import registerServiceWorker from './registerServiceWorker';
import Layout from './Layout';

ReactDOM.render(<div>
    <Reboot />
    <Layout> 
      <App />
    </Layout> 
  </div>, document.getElementById('root'));
registerServiceWorker();
