const mongoose=require('mongoose')
require('colors')
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})
.then(response=>{
    console.log("MongoDB is Connected".green);
    
})
.catch(error=>{
    console.log(`MongoDB is Disconnected`.red);
    
})