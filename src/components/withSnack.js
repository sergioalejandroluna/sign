import React from 'react'
import { Snackbar} from '@material-ui/core';

const withSnack=WrappedComponent=>{
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        snack: false,
        message: ''
      };
    }

    openSnack=msg=>{
      this.setState({
        snack: true,
        message: msg
      });
    
    }

    render() {
      const {snack, message}=this.state
      return (
        <React.Fragment>
          <Snackbar
            open={snack}
            message={message}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            onClose={()=>{ this.setState({snack: false}) }}
          />
          <WrappedComponent  {...this.props} snack={this.openSnack}  />
        </React.Fragment>
      )
    }
  };
}
export default withSnack;
