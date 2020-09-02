const express =require('express');
const bodyParser = require('body-parser');
const app = express();
require('./db')
const FeedbackModel = require('./feedback_schema')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Allow client to access cross domain or ip-address
app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin','*')
  //res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
  //res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers','content-type,x-access-token')
  res.setHeader('Access-Control-Allow-Credentials',true)
  next()
})

app.get('/',(req,res)=>{
  res.end("welcome to root path")
})

app.get('/home',(req,res)=>{
  res.end("welcome to home path")
})

app.post('/api',(req,res)=>{
  const feedback = req.body.feedback;
  const username = req.body.username;

  FeedbackModel.create(req.body,(err,doc)=>{

    if(err) res.json({result:"failed",username: username, feedback:feedback})
    res.json({result:"success",username: username, feedback:feedback})
  })
  //res.end("Received Feedback: "+feedback+",username :"+username)

})

app.get('/api',(req,res)=>{
  FeedbackModel.find((err,doc)=>{
    if(err) res.json({result:"failed"})
    res.json({result:"success",data :doc})
  })
})
app.listen(3200,()=>{
  console.log("server is running...");
})
