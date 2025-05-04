require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./router')


// import mongoDB (connection.js file)
require('./connection')


const server = express()



server.use(cors({
    origin: [
      "http://localhost:5173",       // For local frontend development
     " https://frontend-story-sync.vercel.app",
    ],
    
    methods: ["GET", "POST", "PUT", "DELETE"] // Allowed HTTP methods
  }))

// middleware
server.use(express.json())

server.use(router)

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is running successfully at port number ${PORT}`);
});


server.get('/',(req,res)=>{
    res.send(`get request received`);
})