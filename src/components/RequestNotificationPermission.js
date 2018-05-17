import React from 'react';
import Notification  from 'react-web-notification'
import UserStore from '../stores/UserStore'
// it is just a wrapper  to ask for the permision logic, no push-messages  are rendered here, check public/service-notification for that
class RequestNotificationPermission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: ''
    };
  }

  handlePermissionGranted(){
    UserStore.subscribe_notification()
    this.setState({
      ignore: false
    });
  }

  render() {
    const {ignore,title }= this.state
    return (
        <Notification
          ignore={ignore && title !== ''}
          title={title}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
      />
    )
  }
};

export default RequestNotificationPermission;
