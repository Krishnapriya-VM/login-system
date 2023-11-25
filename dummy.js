const express=require('express')
const app=express()
app.listen(3000)
app.get('/',(req,res)=>{
  res.sendFile(' ')
})
app.get('/about',(req,res)=>{
  res.send('<h2>This is the about</h2>' )
    console.log("Server running at port,3000")

})