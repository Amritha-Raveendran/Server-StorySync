require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./router')


// import mongoDB (connection.js file)
require('./connection')


const server = express()


server.use(cors(
    {
        origin: "https://storysync-server.onrender.com"
    }
))

// middleware
server.use(express.json())

server.use(router)

const port = process.env.port || 5000

server.listen(port, () => {
    console.log(`Server is running successfully at port number ${port}`);
});


server.get('/',(req,res)=>{
    res.send(`get request received`);
})