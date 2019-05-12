const User=require('../models/User')
var bcrypt = require('bcryptjs');


module.exports.registerController=async(req,res)=>{
    
    //name is required
    if(req.body.name.length===0)
     req.check('name','Name is Required').custom(()=>{
        return false
    })

    else
    req.check('name',"Name Should be Atleast 3 char").isLength({min:3})


     //Username is required
    if(req.body.username.length==0)
     req.check('username','UserName is Required').custom(()=>{
         return false
     })
    else
    req.check('username','UserName Should be Atleast 3 char').isLength({min:3})
    
     //User Name Exists Check
        const useNameExists=await User.findOne({username:req.body.username})
           if(useNameExists)
            req.check('username',"UserName Already in use").custom(()=>false)


        
    //email
    if(req.body.email.length===0)
      req.check('email','Email is Required').custom(()=>false)
    else 
      req.check('email','You have to Provide Correct Email').isEmail()

    //Email Using Check
   
       const emailExists=await User.findOne({email:req.body.email})
            if(emailExists)
            req.check('email',`${req.body.email} Already in use`).custom(()=>false)



        
    //password 
    if(req.body.password.length===0)
    req.check('password','Password is Required').custom(()=>false)
    else
    req.check('password','Password Should be 5 char').isLength({min:5})
    //Confirm Password
    if(req.body.confirm_password.length===0)
      req.check('confirm_password',"Confirm Password is Required").custom(()=>{false})

    else
    req.check('password',
    'Password does not match').equals(req.body.confirm_password)
    

     ///Sending user data in database if return false
    if(!req.validationErrors()){

        let {name,username,email,password}=req.body
           password=bcrypt.hashSync(password)


        const newUser=new User({name,username,email,password})

        try {
            const user=await newUser.save()
            if(user)
                res.redirect('back')
        } catch (error) {
        
          
        }
      
    }
    else{
        res.json(req.validationErrors()) 
    }

}