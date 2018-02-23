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
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})
const initialDoc= {id:null, name: '', cc: '', body:initialBody };
export { initialDoc, initialBody }
export default {
docs:[
      {id:1, name: 'Folio feo', cc: 'email@importante', body:initialBody },
      {id:2, name: 'Folio bonito', cc: 'email@aburrido', body:initialBody },
      {id:3, name: 'Folio x', cc: 'email@x', body:initialBody },
      {id:4, name: 'Folio raro', cc: 'email@raro', body:initialBody },
    ],doc:-1}
