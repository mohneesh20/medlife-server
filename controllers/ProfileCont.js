const path=require('path');
const ProfModal=require(path.join(__dirname,'..','modals','ProfileModal.js'));
const ProfileModal=ProfModal();
async function createProfileInfo(req,resp){
if(req.files==null){
    req.body.ProfilePic="download (1)p.png";
    req.body.AadharPic="download.png";
}
else{
    if(req.files.ProfilePic===undefined){
    req.body.ProfilePic='download (1)p.png'
    }
    else{
        req.body.ProfilePic=req.files.ProfilePic.name;
        let fullPath=path.join(__dirname,'..','..','medlife-client-medical','public','uploads',req.body.ProfilePic);
        await req.files.ProfilePic.mv(fullPath,(err)=>{
            if(err){
                console.error('ERROR:'+err.message);
            }
            else{
                console.warn('PROFILE PIC MOVED');
            }
        });
    }
    if(req.files.AadharPic===undefined){
        req.body.AadharPic='download.png';
        }
        else{
            req.body.AadharPic=req.files.AadharPic.name;
            let fullPath=path.join(__dirname,'..','..','medlife-client-medical','public','uploads',req.body.AadharPic);
            await req.files.AadharPic.mv(fullPath,(err)=>{
                if(err){
                    console.error('ERROR:'+err.message);
                }
                else{
                    console.warn('AADHAR PIC MOVED')
                }
            });
        }
} 
await ProfileModal.create(req.body,(err,result)=>{
    if(err){
        resp.send(err);
        return;
    }
    resp.set('json');
    resp.json({"msg":"RECORD INSERTED"});
    console.log(result);
    });

}
async function fetchDashInfo(req,resp){
    let ReqEmail=req.params.RegEmail;
    await ProfileModal.find({RegEmail:ReqEmail})
    .then((result)=>{
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    });
}
async function updateProfileInfo(req,resp){
    if(req.files==null){
        req.body.ProfilePic=req.body.ProfilePic;
        req.body.AadharPic=req.body.AadharPic;
    }
    else{
            if(req.files.ProfilePic===undefined){
            console.log(req.body.ProfilePic);
            }
            else{
                req.body.ProfilePic=req.files.ProfilePic.name;
                let fullPath=path.join(__dirname,'..','..','medlife-client-medical','public','uploads',req.body.ProfilePic);
                await req.files.ProfilePic.mv(fullPath,(err)=>{
                    if(err){
                        console.error('ERROR:'+err.message);
                    }
                    else{
                        console.warn('PROFILE PIC MOVED');
                    }
                });
            }
            if(req.files.AadharPic===undefined){
                console.log(req.body.AadharPic);
                }
                else{
                    req.body.AadharPic=req.files.AadharPic.name;
                    let fullPath=path.join(__dirname,'..','..','medlife-client-medical','public','uploads',req.body.AadharPic);
                    await req.files.AadharPic.mv(fullPath,(err)=>{
                        if(err){
                            console.error('ERROR:'+err.message);
                        }
                        else{
                            console.warn('AADHAR PIC MOVED')
                        }
                    });
                }
    }
    
    await ProfileModal.updateOne({RegEmail:req.body.RegEmail},{$set:{username:req.body.username,mobile:req.body.mobile,address:req.body.address,city:req.body.city,gender:req.body.gender,bloodGrp:req.body.bloodGrp,homestate:req.body.homestate,ProfilePic:req.body.ProfilePic,AadharPic:req.body.AadharPic}}).then(function(result)
    {
              if(result.nModified!==0)
                resp.json({msg:"Updated"});
               else
               resp.json({msg:"NOTHING IS CHANGED"});
        
    }); 
}
async function fetchSupplierInfo(req,resp){
    let RegEmail=req.params.RegEmail;
    await ProfileModal.find({RegEmail:RegEmail}).then((result)=>{
        resp.json(result);
    }).catch((err)=>{
        console.log(err);
    })

}
module.exports={createProfileInfo,fetchDashInfo,updateProfileInfo,fetchSupplierInfo};