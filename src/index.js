import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Reboot from 'material-ui/Reboot';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';

ReactDOM.render(<div>
  <Reboot />
  <BrowserRouter>
    <Layout> 
      <App />
    </Layout> 
  </BrowserRouter>
</div>, document.getElementById('root'));
registerServiceWorker();
