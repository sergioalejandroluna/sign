import React from 'react'
import DocTable from './containers/DocTable';
const Sign=()=>{
  return(<div>
    <h1>En revisión</h1>
    <DocTable fetch='sent' />
  </div>)
}
export default Sign;
