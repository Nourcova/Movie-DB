const express = require ('express');
const app = express();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

app.get('/',(req,res)=>{
    res.sendStatus(200);
})

app.get('/hello/:id',(req,res)=>{
    res.json({status:200,message:req.params.id}) 
})
app.get('/hello',(req,res)=>{
    res.json({status:200,message:"hello"})
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

app.get('/movies/create',(req,res) => {

})
app.get('/movies/read',(req,res) => {
    res.json({status:"200",message:movies})
})
app.get('/movies/update',(req,res) => {
    
})
app.get('/movies/delete',(req,res) => {
    
})

app.listen(3000,() => {
    console.log(`Example app listening at http://localhost:3000`)});