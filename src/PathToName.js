const paths = {
  "/": "Recibidos",
  "/oficios/new": "Crear oficio ",
  "/oficios/:id?": "Editar oficio",
  "/recibidos": "Recibidos",
  "/borradores": "Borradores",
  "/enviados": "Enviados",
  "/en-revision": "En revisión ",
  "/delegar": "Delegar",
  "/grupos": "Grupos de usuario",
  "/login": "Iniciar sesión",
  "/busqueda": "Búsqueda",
};
export default path => {
  if (path.search(/oficios\/\d+/) !== -1) path = "/oficios/:id?";
  const name = paths[path] || "Update PathToName.js";
  return name;
};
