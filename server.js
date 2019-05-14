const express=require('express')
const app=express()
const expressEjsLayouts=require('express-ejs-layouts')
const validator=require('express-validator')
const session=require('express-session')
const cookieParser=require('cookie-parser')
const flash=require('connect-flash')


require('dotenv').config()
require('./dbconnect')


app.set('view engine','ejs')
app.use(expressEjsLayouts)
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(validator())
app.use(session({
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(cookieParser())
app.use(flash())
app.locals.appName="Node Shortener"


app.use((req,res,next)=>{
    //app.locals.errors=req.session.errors;
    app.locals.errors=req.flash('errors')
    app.locals.success_msg=req.flash('success_msg')
    next()
})


/**
 * Routes
 */
const authRouter=require('./routes/auth')

 app.use('/auth',authRouter)

app.get('/set',(req,res)=>{
    req.session.name=req.query.name
    res.send(`Session seted`)
})
app.get('/get',(req,res)=>{
    res.json(req.session)
})


app.use('',(req,res)=>{
    res.render('auth/404')
})

/**
 * Server connection
 */
app.listen(process.env.PORT,()=>{
    console.log(`Server is Working at  ${process.env.PORT}`.blue);
    
})