const express = require('express');
const path=require('path');
const bodyparser=require('body-parser');
const session=require('express-session');
const{v4:uuidv4}=require('uuid');
const router=require('./router');
const nocache=require('nocache');

const app=express();

const port=process.env.PORT||5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.set('view engine','ejs');
app.use(nocache());

// load static assets
app.use('/static',express.static(path.join(__dirname,'public')));


app.use(session({
    secret:'secret here',
    resave:false,
    saveUninitialized:true
}))

app.use('/route',router);

//home route
app.get('/',(req,res,next)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user});
        next();

      }
      else{
        res.render('base',{title:"Login Form"})
    }
})



app.listen(port,()=>{
    console.log("Server started...");
})
