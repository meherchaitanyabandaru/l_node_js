const express = require('express');
const mongoose = require('mongoose');
require('./db/mongoose');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express();
const port = 3000;


// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo Database is  connected successfully!');
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
