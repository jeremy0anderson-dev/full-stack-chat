//import express + routes
const express = require('express');
const routes = require('./controllers');
const userRoutes = require('./controllers/user');
const exphbs = require('express-handlebars');
const {instrument} = require('@socket.io/admin-ui');
//configure app env
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3007;
const app = express();


//import sequelize and express-session
const sequelize = require('./config/connect');
const session = require('./config/session');

//configure socket.io and http server
const server = require('http').createServer(app);
const socketIO = require('socket.io');
const path = require("path");
const io = new socketIO.Server(server,{
    transports:['websocket'],
    cors:{
        origin: ["https://admin.socket.io"],
        credentials: true
    }
});
instrument(io, {
    namespaceName:'/user',
    auth: false
})
        // function that allows socket to access session
const wrap = (middleware)=>(socket, next)=>{
    middleware(socket.request, {}, next);
    console.log('socket session');
}



//configure view engine
app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: false,
    partialsDir: path.join(__dirname, "views", "partials")
}));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session, (req,res,next)=>{
    console.log('session');
        next();
});
app.use(routes);

io.of('/user').use(wrap(session));
app.set('io', io);

sequelize.sync({force: false}).then(()=>{
    server.listen(PORT, () => {
        console.log('Server listening on port: ' + PORT);
    })
});