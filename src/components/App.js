import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import DocTable from './containers/DocTable';
import HomePage from './HomePage';
import DocEditor from './containers/DocEditor';
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout';
import { createMuiTheme,MuiThemeProvider } from 'material-ui/styles';
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import NotFound from './NotFound'
import Delegate from './containers/Delegate'

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
  return(  
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Layout> 
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <PrivateRoute path="/folios" exact component={DocTable}/>
            <PrivateRoute path="/folios/new" exact component={DocEditor}/>
            <PrivateRoute path="/folios/:id?" component={DocEditor}/>
            <PrivateRoute path="/delegar" component={Delegate}/>
            <Route path="/login" component={Login}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        </Layout> 
      </MuiThemeProvider>
    </BrowserRouter>
  )
}



export default App;
