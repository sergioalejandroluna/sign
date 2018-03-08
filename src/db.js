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
    "email": "joselopez@hotmail.com"
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
    "email": "frodobolson@bagend.com"
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
    "email": "walterwithe@bluemeth.com"
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
    "email": "hugo@arkham.com"
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
    "email": "deckard@runner.com"
  },
  {
    "id": 6,
    "name":{
      "title": "The Witcher",
      "full": "Gerald of Rivia"
    },
    "job_title": "Maestro witcher",
    "institution": "Escuela del lobo",
    "username": "gerald",
    "email": "gerald@roach.com"
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
    "email": "kvaks@sleeve.com"
  },
  {
    "id": 8,
    "name":{
      "title": "PHD",
      "full": "Marie Courie"
    },
    "job_title": "Catedrática de química",
    "institution": "Universidad de París",
    "username": "courie",
    "email": "courie@rads.com"
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
    "email": "hquinn@arkham.com"
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
    "email": "miguel@uach.mx"
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
