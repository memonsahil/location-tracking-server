/*
Not assigning the User model & Track model
to any variable since that file needs to run
just once., i.e. the models needs to be
decrared just once.
*/

require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

//Express API.
const app = express();

//Used for parsing the request body.
app.use(bodyParser.json());

//Associating the respective route handler with this app.
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = 'mongodb+srv://admin:passwordpassword@cluster0-jmyxk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'

//Mongoose helps connect to the mongoDB instance.
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance!');
});

mongoose.connection.on('erorr', (err) => {
    console.log('Error connecting to mongo', err);
});

//Making an HTTP request. req - request, res - response.
//Passing the jwt middlware to the initial request.
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

// Listening port set to 3000.
app.listen(3000, () => {
    console.log('Listening on port 3000');
});
