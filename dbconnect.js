const mongoose=require('mongoose')
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})
.then(response=>{
    console.log("MongoDB is Connected");
    
})
.catch(error=>{
    console.log(`MongoDB is Disconnected`);
    
})