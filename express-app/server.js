const express = require('express');
const mongoose = require('mongoose');
require('./db/mongoose');
const authRouter = require('./routes/authRouter');

const app = express();
const port = 3000;


// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongo Database is  connected successfully!');
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.json());
app.use('/users', require('./routes/userRouter'));
app.use('/tasks', require('./routes/taskRouter'));
app.use('/posts', require('./routes/postRouter'));
app.use(authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
