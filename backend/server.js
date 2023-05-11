const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');

require('dotenv').config();

// Create an Express application
const app = express();
const port = process.env.PORT || 5000;

//app.use(cors({origin: true, credentials: true}));
//app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
// Start the server

 const exercisesRouter = require('./routes/exercises');
 const usersRouter = require('./routes/users');


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log('Server started on port '+ port);
  });


  // app.listen((port) => {
  //   console.log('Server started on port '+ port);
  // });