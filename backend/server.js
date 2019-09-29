const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exampleRouter = require('./routes/example')
const authRouter = require('./routes/auth/authentication')
const cookieParser = require('cookie-parser')

const API_PORT = 3001;
const app = express();
app.use(cors());
app.use(cookieParser()); 
// this is our MongoDB database
const dbRoute =
  'mongodb+srv://alex1234:Goblokpol56!@cluster0-rgpac.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

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

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));