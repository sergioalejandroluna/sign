import React from 'react'
import DocStore from '../stores/DocStore';
import DocTable from './containers/DocTable';
const HomePage=()=>{
  return(<div>
    <h1>Borradores</h1> 
    <DocTable fetch='draft' />  
    <h1>En revisión</h1>
    <DocTable fetch='signed' />  
    <h1>Inbox</h1>
    <DocTable fetch='inbox' />  
    <h1>Enviados</h1> 
    <DocTable fetch='sent' />  
   </div>)
}
export default HomePage;
