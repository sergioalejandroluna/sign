import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import DocTable from './containers/DocTable';
import HomePage from './HomePage';
import DocEditor from './containers/DocEditor';
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout';

const App =()=> {
  return(  
    <BrowserRouter>
      <Layout> 
        <Switch>
          <Route path="/folios" component={DocTable}/>
          <Route path="/folio/:id?" component={DocEditor}/>
          <Route path="/" component={HomePage}/>
        </Switch>
      </Layout> 
    </BrowserRouter>
  )
}



export default App;
