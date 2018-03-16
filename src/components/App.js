import React from 'react';
import { Route, Switch  } from 'react-router-dom';
import DocTable from './containers/DocTable';
import HomePage from './HomePage';
import DocEditor from './containers/DocEditor';
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout';
import { createMuiTheme,MuiThemeProvider } from 'material-ui/styles';

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
            <Route path="/folios" component={DocTable}/>
            <Route path="/folio/:id?" component={DocEditor}/>
            <Route path="/" component={HomePage}/>
          </Switch>
        </Layout> 
      </MuiThemeProvider>
    </BrowserRouter>
  )
}



export default App;
