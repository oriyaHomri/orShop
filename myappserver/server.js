const express = require('express')
const app = express()
const port=5000
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/orShop',{useNewUrlParser:true})
const db=mongoose.connection;
db.once('open',()=>{
    console.log('conected!')
})
db.on('error',console.error.bind(console,'connection error'))
const prodacts=mongoose.Schema({
    title:String,
    price:Number,
    description:String,
    image:String
});
const myProdact=mongoose.model('prodact',prodacts);
// const newProdact=new myProdact({
//     title:'Shirt',
//     price:80,
//     description:'Girls shirt',
//     image:'https://m.media-amazon.com/images/I/61yZs5IUNLL._UX569_.jpg'
// })
// newProdact.save()
myProdact.find((err,prodacts)=>{
    if(err){
      throw err;
    }
    else{
        prodacts.forEach((prodact)=>{console.log(prodact.title)})
    }
})
app.get('/', (req, res) => {
    res.send('hello world')})
app.use('/prodacts/',(req,res)=>{res.json(myProdact)})
app.listen(port,()=>console.log(`listen to port ${port}`))