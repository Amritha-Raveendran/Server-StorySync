const mongoose = require('mongoose')

connectionString = process.env.database
mongoose.connect(connectionString).then(()=>{
    console.log(`mongodb connected successfully`); 
}).catch((error)=>{
    console.log(`mongodb connection failed due to an ${error}`);

})
