const express = require ('express');
const app = express();

app.get('/',(req,res)=>{
    res.sendStatus(200);
})

app.get('/test',(req,res)=>{
    res.json({"status":200,"message":"Ok"})
})

app.get('/time',(req,res)=>{
    let hours=new Date().getHours();
    let minutes = new Date().getMinutes();
    res.json({"status":200,"message":`${hours} : ${minutes}`})
})

app.listen(3000,() => {
    console.log(`Example app listening at http://localhost:3000`)});