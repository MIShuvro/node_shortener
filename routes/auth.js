const Router=require('express').Router()

const {registerController}
=require('../controllers/authController')

Router.get('/login',(req,res)=>{
    res.render('auth/login')
});

Router.get('/register',(req,res)=>{
    res.render('auth/register')
});

/**
 * Post Methods
 */
Router.post('/register',registerController)

Router.get('/forgotPassword')


module.exports=Router