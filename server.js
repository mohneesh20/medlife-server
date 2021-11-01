const express=require('express');
const cors=require('cors');
const path=require('path');
const session =require('express-session');
require('dotenv').config();
const mongoose=require('mongoose');
const fileupload=require('express-fileupload');
const cookieParser=require('cookie-parser');
const UserRouter=require('./routers/UserRouters.js');
const PORT=process.env.PORT||3003;
const app=express();
app.use(express.static('public'));
app.set('trust proxy',1);
app.use(cors(
    {
        origin:['http://medlife-server.herokuapp.com','http://localhost:3000'],
        method:['GET','POST'],
        credentials:true,
    }
    ));
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        maxAge:1000*60*60*24
    }
}));
// app.use((req,resp,next)=>{
//     console.log(req.session);
//     next();
// })
const dbCon=process.env.DB_STRING;
mongoose.connect(dbCon, {useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false }).then(()=>{
    console.log("CONNECTED");
}).catch((err)=>{
    console.log(err);
});

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'medlife','build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'medlife','build','index.html'));
    });
}

app.use('/api',UserRouter);
app.listen(PORT,()=>{
    console.log("SERVER STARTED");
});