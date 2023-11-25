const express=require('express')
const app=express()
const router=require('./router')
const {v4:uuidv4}=require('uuid')
const session=require('express-session')
const path=require('path')
// const bodyParser=require('body-parser')

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))


// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/static", express.static(path.join(__dirname, "public")));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));






//set ejs
app.set('view engine','ejs')



app.use('/',router)

app.listen(5001,()=>{
    console.log("Server on http://localhost:5001")
})
