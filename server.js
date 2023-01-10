require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const routes = require('./routes');
const path = require('path');
const { meuMiddleware, checkCsfrErro, csrfMiddleware} = require('./src/middlewares/middleware')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTIONSTRING)
    .then( () => {
        app.emit('Pronto');
    })
    .catch( (e) => {
        console.log(e);
    });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf')
 
app.use(helmet())
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')))
const sessionOptions = session({
    secret: '2EoY}UFou#wt%qHoMn3QM)!q',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized:false,
    cookie :{
        maxAge: 1000 * 60 * 60 * 24 *7,
        httpOnly: true
    }
})
app.use(sessionOptions);
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');


// csrf Midleware
app.use(csrf());
app.use(csrfMiddleware)
app.use(checkCsfrErro)
// Midleware
app.use(meuMiddleware)
app.use(routes);


app.on('Pronto', () => {
    app.listen(3000, () => {
        console.log('Conexão a base de dados iniciada\nServidor iniciado\nlocalhost:3000');
    });
});
