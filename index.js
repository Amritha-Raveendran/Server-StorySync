require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./router')



// import mongoDB (connection.js file)
require('./connection')


const server = express()



server.use(cors({
  origin:"*",

  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
server.options('*', cors()) // handle preflight

// middleware
server.use(express.json())

server.use(router)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server is running successfully at port number ${PORT}`);
});


server.get('/', (req, res) => {
  res.send(`get request received`);
})