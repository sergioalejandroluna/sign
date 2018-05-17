import React from 'react'
import DocStore from '../stores/DocStore';
import DocTable from './containers/DocTable';
const HomePage=()=>{
  return(<div>
    <h1>Borradores</h1> 
    <DocTable fetch={DocStore.draft()} />  
    <h1>En revisión</h1>
    <DocTable fetch={DocStore.signed()} />  
    <h1>Recibidos</h1>
    <DocTable fetch={DocStore.inbox()} />  
    <h1>Enviados</h1> 
    <DocTable fetch={DocStore.sent()} />  
    
   </div>)
}
export default HomePage;
