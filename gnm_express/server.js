const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('./db/mongoose');
const authRouter = require('./routes/authRouter');
const {invalidRequestError} = require('./utils/customHttpMessages');


// setting app
const app = express();
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
const port = 3000;


// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongo Database is  connected successfully!');
});
app.get('/healthcheck', (req, res) => {
  res.send('Application is UP and Running..!');
});

app.use(express.json());
app.use('/users', require('./routes/userRouter'));
app.use('/tasks', require('./routes/taskRouter'));
app.use('/posts', require('./routes/postRouter'));
app.use('/events', require('./routes/eventRouter'));
app.use(authRouter);

// this is default in case of unmatched routes
app.use(function(req, res) {
  // Invalid request
  res.json(invalidRequestError('Invalid URL'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
