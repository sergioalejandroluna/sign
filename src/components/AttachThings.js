import React from 'react'
import PropTypes from 'prop-types'
import { Chip, Avatar, Grid } from '@material-ui/core'
import DocStore from '../stores/DocStore'
import { withStyles } from '@material-ui/core/styles';

const fileInfo=f=>{
  const name=f.split('/').pop() 
  return name.split('.')
}

const styles={
  root:{
    paddingTop: 8 
  }
}

class AttachThings extends React.Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const tprops=this.props
    return tprops.open!==nextProps.open || tprops.files.length!==nextProps.files.length
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.open ){
      this.input.current.click();
      this.props.onClose();
    }
  }

  render(){
    const {files, classes, onDelete}=this.props
    return (
      <Grid container spacing={8} className={classes.root} >
        {files.map((f,i)=>{
          const info=fileInfo(f)
          return(
            <Grid item  key={i} >
              <Chip
                avatar={
                  <Avatar >
                    {info[1]}
                  </Avatar>
                }
                onClick={e=>{ DocStore.downloadAttacment(f) }}
                label={info[0]}
                onDelete={e=>{ onDelete(f) }}
              /> 
            </Grid>
          )

        }) }
        <input type='file' className='hidden'  ref={this.input} onChange={this.props.onChange} multiple />
      </Grid>
    );
  }
}

export default withStyles(styles)(AttachThings);
AttachThings.propTypes={
  open: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
