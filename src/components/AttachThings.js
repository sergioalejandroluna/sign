import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Chip } from '@material-ui/core'
import { Face } from '@material-ui/icons'

const dotName=f=>{
  return f.split('/').pop().split('.')
}

class AttachThings extends React.Component {

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   const tprops=this.props
  //   return tprops.open!==nextProps.open || tprops.files!==nextProps.files 
  // }

  componentDidUpdate(prevProps, prevState, snapshot){
    if (this.props.open ){
      this.input.current.click();
      this.props.onClose();
    }
  }

  render(){
    const {files}=this.props
    return (
      <div>
        {files.map((f,i)=>{
          const name=dotName(f)
          return(
            <Chip
              key={i}
              avatar={
                <Avatar>
                  { name[1] }
                </Avatar>
              }
              label={name[0]}
            /> 
          )

        }) }
        <input type='file' className='hidden'  ref={this.input} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default AttachThings;
AttachThings.propTypes={
  open: PropTypes.bool.isRequired,
  files: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
}
