const ses = require('express-session');
const SessionStore = require('connect-session-sequelize')(ses.Store);
require('dotenv').config();
const sequelize = require('./connect');
const session = ses({
    name: 'sid',
    secret:'secret',
    cookie:{
        maxAge: 1000*60*60*24,
        secure: process.env.NODE_ENV === "production"
    },
    proxy: process.env.NODE_ENV === "production",
    saveUninitialized: false,
    resave: false,
    store: new SessionStore({
        db: sequelize
    })

})

module.exports = session