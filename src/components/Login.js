import React from 'react';
import {Redirect} from 'react-router-dom';
import UserStore from '../stores/UserStore'
import { Button  } from 'material-ui';
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    UserStore.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return (<Redirect to={from} />)
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <Button onClick={this.login}>Log in</Button>
      </div>
    )
  }
}
export default Login;
