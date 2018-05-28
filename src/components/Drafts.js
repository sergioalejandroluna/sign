import React from 'react'
import DocTable from './containers/DocTable';
const Drafts=()=>{
  return(<div>
    <h1>Borradores</h1>
    <DocTable fetch='draft' />
  </div>)
}
export default Drafts;
