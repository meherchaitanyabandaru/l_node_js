const express = require('express');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./db/mongoose');
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');
const postRouter = require('./routes/post');

const app = express();
const port = 3000;


// Get the default connection
const db = mongoose.connection;

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      name: 'MEHAR BANDARU',
    },
  },
  // eslint-disable-next-line max-len
  apis: ['./routes/*.js'], // files containing annotations as above
};


const swaggerDocs= swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



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
app.use(postRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
