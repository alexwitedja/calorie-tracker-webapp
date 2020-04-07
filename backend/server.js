const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const exampleRouter = require('./routes/example')
const authRouter = require('./routes/auth/authentication')
const recRouter = require('./routes/recommender/recommend')
const trackRouter = require('./routes/tracker/track')
const searchRouter = require('./routes/search/searchfood')
const cookieParser = require('cookie-parser')
const nconf = require('nconf')

nconf.argv().env().file('keys.json');

const API_PORT = 8080;
const app = express();
app.use(cors());
app.use(cookieParser()); 
// this is our MongoDB database 
nconf.argv().env().file('keys.json');
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const mongoDatabase=nconf.get('mongoDatabase');

let uri = `mongodb+srv://${user}:${pass}@${host}/${mongoDatabase}`;

// connects our back end code with the database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router for example....
app.use('/example', exampleRouter)
app.use('/auth', authRouter)
app.use('/rec', recRouter)
app.use('/track', trackRouter)
app.use('/search', searchRouter)

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));