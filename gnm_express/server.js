const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('./db/mongoose');
const authRouter = require('./routes/authRouter');
const {invalidRequestError} = require('./utils/customHttpMessages');
const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey = fs.readFileSync('./cert/server.key');
const certificate = fs.readFileSync('./cert/server.crt');

const credentials = {key: privateKey, cert: certificate};


// setting app
const app = express();
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// const port = 3000;


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


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

// your express configuration here

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
