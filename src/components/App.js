import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import DocEditor from './containers/DocEditor';
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout';
import ErrorBoundary from './ErrorBoundary';
import { createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import NotFound from './NotFound'
import Delegate from './containers/Delegate'
import Inbox  from "./Inbox";
import Drafts  from "./Drafts";
import Sent  from "./Sent";
import Sign  from "./Sign";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9876ba',
      main: '#694a8a',
      dark: '#3c215c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f8fdff',
      main: '#c5cae9',
      dark: '#9499b7',
      contrastText: '#000',
    },
  },
});

const App =()=> {
  // PLEASE update the PathToName.js file when you add/modify a route
  return(  
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Layout> 
          <ErrorBoundary>
            <Switch>
              <PrivateRoute path="/" exact component={Inbox}/>
              <PrivateRoute path="/oficios/new" exact component={DocEditor}/>
              <PrivateRoute path="/oficios/:id?" component={DocEditor}/>
              <PrivateRoute path="/recibidos"  component={Inbox}  />
              <PrivateRoute path="/borradores"  component={Drafts}  />
              <PrivateRoute path="/enviados"  component={Sent}  />
              <PrivateRoute path="/en-revision"  component={Sign}  />
              <PrivateRoute path="/delegar" component={Delegate}/>
              <Route path="/login" component={Login}/>
              <Route path="*" component={NotFound}/>
            </Switch>
          </ErrorBoundary>
        </Layout> 
      </MuiThemeProvider>
    </BrowserRouter>
  )
}



export default App;
