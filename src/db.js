var {initialDoc,initialBody} = require('./stores/initialState');
const address={street:'Calle larga largota #1212',
  colony: 'Centro',
  city:'Chihuahua,Chihuahua',
  zip: '31124'}
const  users= [
  {
    "id": 1,
    "name":{
      "title": "M.I.D",
      "full": "José López Pérez"
    },
    "job_title": "Coordinador de ventas",
    "institution": "Universidad Autónoma de Chihuahua",
    "username": "JoseLopez",
    "email": "joselopez@hotmail.com",
    photo: "https://pbs.twimg.com/profile_images/450658558523506688/DFoezuQ3.jpeg"
  },
  {
    "id": 2,
    "name":{
      "title": "El portador",
      "full": "Frodo Baggings"
    },
    "job_title": "Cargar el anillo",
    "institution": "La comunidad del anillo",
    "username": "frodobolson",
    "email": "frodobolson@bagend.com",
    photo: "https://cdn.costumewall.com/wp-content/uploads/2017/06/frodo-baggins.jpg"
  },
  {
    "id": 3,
    "name":{
      "title": "QBP",
      "full": "Walter White"
    },
    "job_title": "Profesor de quimica",
    "institution": "Supervisor pollos hermanos",
    "username": "walterwhite",
    "email": "walterwithe@bluemeth.com",
    photo: "https://www.sideshowtoy.com/wp-content/uploads/2016/06/breaking-bad-walter-white-life-size-bust-supacraft-feature-902754.jpg"
  },
  {
    "id": 4,
    "name":{
      "title": "DR",
      "full": "Hugo Strange"
    },
    "job_title": "Jefe de psiquiatría",
    "institution": "Arkham",
    "username": "Hugo",
    "email": "hugo@arkham.com",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Hugo_Strange_Gotham.jpg/170px-Hugo_Strange_Gotham.jpg"
  },
  {
    "id": 5,
    "name":{
      "title": "Replicant",
      "full": "Rick Deckard"
    },
    "job_title": "Policía",
    "institution": "Departamento de policía de los Ángeles",
    "username": "deckard",
    "email": "deckard@runner.com",
    photo: "https://pbs.twimg.com/profile_images/414915565229076481/AZ3lCeHf_400x400.jpeg"
  },
  {
    "id": 6,
    "name":{
      "title": "The Witcher",
      "full": "Geralt of Rivia"
    },
    "job_title": "Maestro witcher",
    "institution": "Escuela del lobo",
    "username": "gerald",
    "email": "gerald@roach.com",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeakMaTTPtsdL4U87Xv7IGftUmITqQBkndJRlvP3FklCjMtwcX"
  },
  {
    "id": 7,
    "name":{
      "title": "Envoy",
      "full": "Takeshi Kovacs"
    },
    "job_title": "Special forces",
    "institution": "Global order",
    "username": "kvaks",
    "email": "kvaks@sleeve.com",
    photo: "https://i.imgur.com/cb4dy0V.gif"
  },
  {
    "id": 8,
    "name":{
      "title": "PHD",
      "full": "Marie Curie"
    },
    "job_title": "Catedrática de química",
    "institution": "Universidad de París",
    "username": "courie",
    "email": "curie@rads.com",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPC7j-2H-cTcBg63Xu5Fpp_ggw3S-HNz6sEOeXLco0poI2x1C4"
  },
  {
    "id": 9,
    "name":{
      "title": "DR",
      "full": "Harleen Frances Quinzel"
    },
    "job_title": "Psiquiatría médica",
    "institution": "Arkham",
    "username": "quinn",
    "email": "hquinn@arkham.com",
    photo: "https://cdn.vox-cdn.com/thumbor/pHBJL8ahQkxp_a8oUINOlDQ62Pk=/0x0:1560x780/1200x800/filters:focal(693x266:941x514)/cdn.vox-cdn.com/uploads/chorus_image/image/57846439/harley.0.0.jpg"
  },
  {
    "id": 10,
    "name":{
      "title": "M.I.D.",
      "full": "Miguel Ángel López Santillán"
    },
    "job_title": "Coordinador General de Tecnologías de Información",
    "institution": "Universidad Autónoma de Chihuahua",
    "username": "miguellopez",
    "email": "miguel@uach.mx",
    photo: "http://fing.uach.mx/facultad/2015/09/01/LopezSantillanMiguelAngel.JPG",
  },
  {
    "id": 11,
    "name":{
      "title": "M.F.",
      "full": "Manuel Alfonso Palicio Guevara"
    },
    "job_title": "Coordinador General de Tecnologías de Información",
    "institution": "Universidad Autónoma de Chihuahua",
    "username": "manuelAlfonoso",
    "email": "manuel@uach.mx",
    photo: "http://recursoshumanos.uach.mx/portal/2012/10/02/pic1.JPG",
  }
]
const getRandom=(min,max)=>{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomUser=()=>{
  return users[getRandom(0,users.length-1)];
}
const docs=[
  {id:1,date: '1999-12-11', folio: 'ADS/756/H67', to: randomUser(), body:initialBody , address:address},
  {id:2,date: '1990-11-12', folio: 'DFG/285/Y56', to: randomUser(), body:initialBody , address:address},
  {id:3,date: '1991-10-13', folio: 'RTH/552/R51', to: randomUser(), body:initialBody , address:address},
  {id:4,date: '1992-09-14', folio: 'DVU/104/A34', to: randomUser(), body:initialBody , address:address},
]

module.exports = () => {
  return {users:users,login_user: users.pop(),docs:docs}
}
