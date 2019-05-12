const express=require('express')
const app=express()
const expressEjsLayouts=require('express-ejs-layouts')
const validator=require('express-validator')
require('dotenv').config()
require('./dbconnect')

const authRouter=require('./routes/auth')


app.set('view engine','ejs')
app.use(expressEjsLayouts)
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(validator())

app.locals.appName="Node Shortener"
/**
 * Routes
 */

 app.use('/auth',authRouter)




app.listen(process.env.PORT,()=>{
    console.log(`Server is Working at  ${process.env.PORT}`);
    
})