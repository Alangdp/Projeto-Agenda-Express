const express = require('express')
const route = express.Router();
const homeControler = require('./src/controllers/homeControler')
const contatoController = require('./src/controllers/contatoController')



// Rotas Home

route.get('/',homeControler.paginaInicial)
route.post('/', homeControler.teste)

// Rotas Contato

route.get('/contato', contatoController.contatoGet)


module.exports = route;