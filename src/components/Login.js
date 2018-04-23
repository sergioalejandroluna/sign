import React from 'react';
import {Redirect} from 'react-router-dom';
import UserStore from '../stores/UserStore'
import { Button  } from 'material-ui';
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  componentDidMount(){
    UserStore.fetchLoginUser(window.location.search).then((auth)=>{
      if (this.unmounted) return;
      this.setState({redirectToReferrer: auth}) 
    })
  }
  componentWillUnmount(){
    this.unmounted = true;
  }

  login = () => {
    UserStore.authenticate()
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: UserStore.popLocal('from') || '/' } } 
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return (<Redirect to={from} />)
    }
    UserStore.saveLocal('from',from.pathname)

    return (
      <div>
        <p>Favor de autenticarte para continuar</p>
        <Button color='primary' onClick={this.login}>Log in con google(Me falta estilo)</Button>
        <div><b>Falta texto exlpique solo personal de la uach entra con su cuenta de google</b></div>
      </div>
    )
  }
}
export default Login;
