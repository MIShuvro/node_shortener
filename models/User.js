const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true
    },
    username:{
        type:String,
        trim:true
      
    },
    email:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        trim:true
  

    }
})

const UserModel= mongoose.model('UserModel',userSchema);
module.exports=UserModel