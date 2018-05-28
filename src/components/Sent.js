import React from 'react'
import DocTable from './containers/DocTable';
const Sent=()=>{
  return(<div>
    <h1>Enviados</h1>
    <DocTable fetch='sent' />
  </div>)
}
export default Sent;
