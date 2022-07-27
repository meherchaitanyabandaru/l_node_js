const express = require('express')
const md5 = require('md5');
const random = require('random-name');
const { v4: uuidv4 } = require('uuid');
const {encryptPlainText} =require('../express-app/utils/secure')
require('./db/mongoose')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})