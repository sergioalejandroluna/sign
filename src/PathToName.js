const paths= {
   "/" : "Recibidos",
   "/oficios/new": "Oficio",
   "/oficios/:id?": "Oficio",
   "/recibidos" : "Recibidos",
   "/borradores": "Borradores",
   "/enviados" : "Enviados",
   "/en-revision": "En revisión ",
   "/delegar": "Delegar",
}
export default (path)=>{
  const name =paths[path] || 'Update PathToName.js'
  return paths[path] 
}
