const express = require('express');
const app = express();
const config = require('./modules/server');
const {resolve} = require('path');

// External modules
const methodOverride = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const cors = require('cors');

// Cors configuration for deployed website
// app.use((req, res, next) => {
    //     res.setHeader('Access-Control-Allow-Origin', 'https://bem-cvku.onrender.com/');
    //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //     next();
// });

// Cors configuration for local run
app.use(cors());

app.set('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.static(resolve(__dirname,'../public/')));

app.use(express.urlencoded({extended: true}));

app.use(cookies());

app.use(methodOverride('_method'));

app.use(session({
    secret:'express-users',
    resave: false,
    saveUninitialized: true
}))

// Middlewares
const globalUserLogMiddleware = require('./middlewares/globalUserLogMiddleware');
app.use(globalUserLogMiddleware)

// Main routes
const routesMain = require('./routes/mainRouter');
app.use('/', routesMain);

// Product routes
const routesProducts = require('./routes/productsRouter');
app.use('/products/', routesProducts);

// User routes
const routesUsers = require('./routes/usersRouter');
app.use('/users/', routesUsers);

// Api routes
const apiProductsRouter = require('./routes/apiRoutes/apiProductsRouter');
const apiUsersRouter = require('./routes/apiRoutes/apiUsersRouter');
app.use ('/api/products', apiProductsRouter);
app.use ('/api/users', apiUsersRouter);

// Error 404
app.use((req,res,next) => {
    res.status(404).render('main/notFound.ejs');
})
    

// Server port config & start
app.listen(config.port,config.start());