const express = require('express')
const md5 = require('md5');
const random = require('random-name');
const { v4: uuidv4 } = require('uuid');
const {encryptPlainText} =require('../express-app/utils/secure')


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/mdfive', (req, res) => {
  let name = random.first();
  res.send(name + " is encrypted as : " + md5(name)+ " with MD5 Algorithm")
})

app.get('/uuidtest', (req, res) => {
  res.send(uuidv4())
})


app.get('/importtest', (req, res) => {
  res.send(encryptPlainText("tst"))
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})