const path=require('path');
const bcrypt=require('bcrypt');
const UsModal=require(path.join(__dirname,'..','modals','UserModal.js'));
const UserModal=UsModal();
async function createUserInfo(req,resp){
    let salt=await bcrypt.genSalt(5);
    req.body.password=await bcrypt.hash(req.body.password,salt);
    await UserModal.create(req.body,(err,result)=>{
        if(err){
            console.log("ERR:"+err)
            resp.send(err);
            return;
        }
        req.session.user=req.body.RegEmail;
        resp.set('json');
        resp.json({'msg':'RECORD INSERTED'});
    });
}
async function LoginUserInfo(req,resp){
    let {RegEmail,password}=req.params;
    await UserModal.find({RegEmail:RegEmail}).then(async function(result){
        if(result.length===0){
            resp.json({msg:'NO ACCOUNT FOUND WITH THIS EMAIL'});
        }
        else{
            let res=await bcrypt.compare(password,result[0].password);
            if(res&&result[0].status){
                // console.log(result[0].RegEmail);
                req.session.user=result[0].RegEmail;
                // console.log(req.session);
                resp.json({msg:'ACCESS GRANTED',login:true});
            }
            else{
                if(result[0].status){
                resp.json({msg:'ACCESS DENIED',login:false});
                }
                else{
                    resp.json({msg:'ACCESS DENIED BY OWNER',login:false});
                }
            }
        }
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    });

}
async function updateUserPassword(req,resp){
    let {RegEmail,password}=req.params;
    let salt=await bcrypt.genSalt(5);
    password=await bcrypt.hash(password,salt)
    await UserModal.updateOne({RegEmail:RegEmail},{$set:{password}}).then(result=>{
        if(result.nModified!==0)
        resp.json({msg:'UPDATED'})
        else
        resp.json({msg:'INVALID ID'});
    })

}
async function LogOut(req,resp){
    req.session.destroy();
    console.log(req.session);
    resp.send('YOU ARE LOGGED OUT');
}
async function CheckLogin(req,resp){
    resp.set('json');
    resp.json({msg:'LOGGED IN'});
}
async function Admin(req,resp){
    await UserModal.find().then((result)=>{
        resp.set('json');
        resp.json(result);
    })
    .catch(e=>{
        console.error(e);
    })
}
async function UserStatus(req,resp){
    let {RegEmail,status}=req.params;
    await UserModal.updateOne({RegEmail:RegEmail},{$set:{status:status}}).then(function(result){
        if(result.nModified!==0)
            console.log({msg:"UPADTED"});
        else
            console.log({msg:"INVALID ID"});
    })
}
module.exports={createUserInfo,LoginUserInfo,updateUserPassword,LogOut,CheckLogin,Admin,UserStatus};