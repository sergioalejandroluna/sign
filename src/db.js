var {initialBody} = require('./stores/initialState');
const addresses=[
  {street:'Calle larga #1212',
  colony: 'Centro',
  city:'Chihuahua,Chihuahua',
  zip: '31124'},
  {street:'Calle corta #1212',
  colony: 'Centro',
  city:'Jurez,Chihuahua',
  zip: '31124'},
  {street:'Calle mediana #1212',
  colony: 'Centro',
  city:'Juarez,Chihuahua',
  zip: '31124'},
  {street:'Calle algodon #1212',
  colony: 'Centro',
  city:'Meoqui,Chihuahua',
  zip: '31124'},
]
const  users= [
  {
    "id": 1,
    "name":{
      "title": "M.I.D",
      "full": "José López Pérez"
    },
    "job_title": "Coordinador de ventas",
    "institution": "Universidad Autónoma de Chihuahua",
    "email": "joselopez@hotmail.com",
    photo: "https://pbs.twimg.com/profile_images/450658558523506688/DFoezuQ3.jpeg",
    signature: "http://www.webbcountytx.gov/DC49th/jalopezsignature.gif"
  },
  {
    "id": 2,
    "name":{
      "title": "El portador",
      "full": "Frodo Baggings"
    },
    "job_title": "Cargar el anillo",
    "institution": "La comunidad del anillo",
    "email": "frodobolson@bagend.com",
    photo: "https://cdn.costumewall.com/wp-content/uploads/2017/06/frodo-baggins.jpg",
    signature: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/The_Lord_Cowley_signature.svg/2000px-The_Lord_Cowley_signature.svg.png'
  },
  {
    "id": 3,
    "name":{
      "title": "QBP",
      "full": "Walter White"
    },
    "job_title": "Profesor de quimica",
    "institution": "Supervisor pollos hermanos",
    "email": "walterwithe@bluemeth.com",
    photo: "https://www.sideshowtoy.com/wp-content/uploads/2016/06/breaking-bad-walter-white-life-size-bust-supacraft-feature-902754.jpg",
    signature: "http://isilaltay.com/images/Acbrn6pgi.jpg"
  },
  {
    "id": 4,
    "name":{
      "title": "DR",
      "full": "Hugo Strange"
    },
    "job_title": "Jefe de psiquiatría",
    "institution": "Arkham",
    "email": "hugo@arkham.com",
    photo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Hugo_Strange_Gotham.jpg/170px-Hugo_Strange_Gotham.jpg",
    signature: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Autograph-VictorHugo.png"
  },
  {
    "id": 5,
    "name":{
      "title": "Replicant",
      "full": "Rick Deckard"
    },
    "job_title": "Policía",
    "institution": "Departamento de policía de los Ángeles",
    "email": "deckard@runner.com",
    photo: "https://pbs.twimg.com/profile_images/414915565229076481/AZ3lCeHf_400x400.jpeg",
    signature: 'https://nashuarescuemission.org/wp-content/uploads/2015/07/Director-Nashua-RM-Signature-BLACK.jpg'
  },
  {
    "id": 6,
    "name":{
      "title": "The Witcher",
      "full": "Geralt of Rivia"
    },
    "job_title": "Maestro witcher",
    "institution": "Escuela del lobo",
    "email": "gerald@roach.com",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeakMaTTPtsdL4U87Xv7IGftUmITqQBkndJRlvP3FklCjMtwcX",
    signature: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Gerald_O%27Brien_Signature.jpg/320px-Gerald_O%27Brien_Signature.jpg"
  },
  {
    "id": 7,
    "name":{
      "title": "Envoy",
      "full": "Takeshi Kovacs"
    },
    "job_title": "Special forces",
    "institution": "Global order",
    "email": "kvaks@sleeve.com",
    photo: "https://i.imgur.com/cb4dy0V.gif",
    signature: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Takeshi_Kitano_Signature.svg/2000px-Takeshi_Kitano_Signature.svg.png'
  },
  {
    "id": 8,
    "name":{
      "title": "PHD",
      "full": "Marie Curie"
    },
    "job_title": "Catedrática de química",
    "institution": "Universidad de París",
    "email": "curie@rads.com",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPC7j-2H-cTcBg63Xu5Fpp_ggw3S-HNz6sEOeXLco0poI2x1C4",
    signature: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Marie_Curie_signature.svg/2000px-Marie_Curie_signature.svg.png'
  },
  {
    "id": 9,
    "name":{
      "title": "DR",
      "full": "Harleen Frances Quinzel"
    },
    "job_title": "Psiquiatría médica",
    "institution": "Arkham",
    "email": "hquinn@arkham.com",
    photo: "https://cdn.vox-cdn.com/thumbor/pHBJL8ahQkxp_a8oUINOlDQ62Pk=/0x0:1560x780/1200x800/filters:focal(693x266:941x514)/cdn.vox-cdn.com/uploads/chorus_image/image/57846439/harley.0.0.jpg",
    signature: 'http://www.rightcapital.co.uk/wp-content/uploads/2015/11/marq-quinn-signature-600x220.png'
  },
  {
    "id": 10,
    "name":{
      "title": "M.I.D.",
      "full": "Miguel Ángel López Santillán"
    },
    "job_title": "Coordinador General de Tecnologías de Información",
    "institution": "Universidad Autónoma de Chihuahua",
    "email": "miguel@uach.mx",
    photo: "http://fing.uach.mx/facultad/2015/09/01/LopezSantillanMiguelAngel.JPG",
    signature: 'https://static.tumblr.com/4b24146cadea43435dd932cd5995ef22/pirpteh/nzDn3a9yw/tumblr_static_miguel_s-signature.jpg'
  },
  {
    "id": 11,
    "name":{
      "title": "M.F.",
      "full": "Manuel Alfonso Palicio Guevara"
    },
    "job_title": "Coordinador General de Tecnologías de Información",
    "institution": "Universidad Autónoma de Chihuahua",
    "email": "manuel@uach.mx",
    photo: "http://recursoshumanos.uach.mx/portal/2012/10/02/pic1.JPG",
    signature: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Juan_Manuel_Santos_Signature.svg/500px-Juan_Manuel_Santos_Signature.svg.png"
  }
]
const login_user=users.pop()
const emptyUser={
    "name":{
      "title": "",
      "full": ""
    },
    "job_title": "",
    "institution": "",
    "email": "",
    photo: "",
    signature: ""
  }
const newDoc=()=>{
  return {date: (new Date()).toISOString().slice(0,10), folio: '',
    to: emptyUser, from: login_user, body:initialBody , 
    address:addresses[0], created_by: login_user}
}
const getRandom=(min,max)=>{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomUser=()=>{
  return users[getRandom(0,users.length-1)];
}
const randomAddress=()=>{
  return addresses[getRandom(0,addresses.length-1)];
}
const docs=[
  {id:1,date: '1999-12-11', folio: 'ADS/756/H67', to: randomUser(), from: randomUser(), body:initialBody , address:randomAddress(), created_by: randomUser(), sent: false},
  {id:2,date: '1990-11-12', folio: 'DFG/285/Y56', to: randomUser(), from: randomUser(), body:initialBody , address:randomAddress(), created_by: randomUser(), sent: false},
  {id:3,date: '1991-10-13', folio: 'RTH/552/R51', to: randomUser(), from: randomUser(), body:initialBody , address:randomAddress(), created_by: randomUser(), sent: false},
  {id:4,date: '1992-09-14', folio: 'DVU/104/A34', to: randomUser(), from: randomUser(), body:initialBody , address:randomAddress(), created_by: randomUser(), sent: false},
]
module.exports = () => {
  return {users:users,login_user: login_user,docs:docs, addresses: addresses, new_doc: newDoc()  }
}

