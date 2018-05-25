import React from 'react'
import DocTable from './containers/DocTable';
const Inbox=()=>{
  return(<div>
    <h1>Recibidos</h1>
    <DocTable fetch='inbox' />
  </div>)
}
export default Inbox;
