import { Value } from 'slate'
const initialBody = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
})
const currentDate=()=>{
  return new Date(Date.now()).toISOString().split('T')[0]
}
const address={street:'Calle larga largota #1212',
  colony: 'Centro',
  city:'Chihuahua,Chihuahua',
  zip: '31124'}
const initialDoc=()=> { return {id:null, name: '', cc: '', body:initialBody,date:currentDate(),address:address }; }
export { initialDoc, initialBody }
export default {
  docs:[
    {id:1,date: '1999-12-11', name: 'Folio feo', cc: 'email@importante', body:initialBody , address:address},
    {id:2,date: '1990-11-12', name: 'Folio bonito', cc: 'email@aburrido', body:initialBody , address:address},
    {id:3,date: '1991-10-13', name: 'Folio x', cc: 'email@x', body:initialBody , address:address},
    {id:4,date: '1992-09-14', name: 'Folio raro', cc: 'email@raro', body:initialBody , address:address},
  ]}
