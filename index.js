const express = require ('express');
const app = express();

app.get('/',(req,res)=>{
    res.sendStatus(200);
})

app.get('/test',(req,res)=>{
    res.json({status:200,message:"Ok"})
})

app.get('/time',(req,res)=>{
    let hours=new Date().getHours();
    let minutes = new Date().getMinutes();
    res.json({status:200,message:`${hours} : ${minutes}`})
})

app.get('/search',(req,res)=>{
    console.log(req.query.s);
    req.query.s ? res.json({status:200,message:"Ok",data:req.query.s}) : res.status(500).json({status:500,error:true, message:"you have to provide a search"})
})

app.get('/hello/:id',(req,res)=>{
    res.json({status:200,message:req.params.id}) 
})
app.get('/hello',(req,res)=>{
    res.json({status:200,message:"hello"})
})

app.listen(3000,() => {
    console.log(`Example app listening at http://localhost:3000`)});