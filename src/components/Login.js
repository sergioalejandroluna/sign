import React from 'react';
import {Redirect} from 'react-router-dom';
import UserStore from '../stores/UserStore'
import { Button  } from '@material-ui/core';
import styles from './LayoutStyle'
import { withStyles } from '@material-ui/core/styles'
import { Logo } from '../img';
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
    const { classes } = this.props;
    if (redirectToReferrer === true) {
      return (<Redirect to={from} />)
    }
    UserStore.saveLocal('from',from.pathname)

    return (
      <div>
        <img src={Logo} alt="logo"  width="100px" />
        <p className={classes.login_header}>Acceder</p>
        <p className={classes.login_subheader}>Usa tu cuenta de Google</p>
        <Button className={classes.login_button} color="primary" variant="raised" onClick={this.login}>Iniciar sesión</Button>
        <p className={classes.login_footer}>Uso exclusivo del personal de la UACH con correo de <strong>Google.</strong></p>
      </div>
    )
  }
}
//export default Login;
export default withStyles(styles, { withTheme: true })(Login);
