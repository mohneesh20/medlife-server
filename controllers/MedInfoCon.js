const path=require('path');
const MedInfoModal=require(path.join(__dirname, '..', 'modals','MedInfoModal.js'));
const MedInfo=MedInfoModal();
async function createMedInfo(req,resp){
    if(req.files==null){
        req.body.FrontView="download (1)p.png";
        req.body.RearView="download.png";
    }
    else{
        if(req.files.FrontView===undefined){
            req.body.FrontView='download (1)p.png'
            }
            else{
                req.body.FrontView=req.files.FrontView.name;
                let fullPath=path.join(__dirname,'..','..','medlife-client-medical','public','uploads',req.body.FrontView);
                await req.files.FrontView.mv(fullPath,(err)=>{
                    if(err){
                        console.error('ERROR:'+err.message);
                    }
                    else{
                        console.warn('PROFILE PIC MOVED');
                    }
                });
            }
            if(req.files.RearView===undefined){
                req.body.RearView='download.png';
                }
                else{
                    req.body.RearView=req.files.RearView.name;
                    let fullPath=path.join(__dirname,'..','..','medlife-client-medical','public','uploads',req.body.RearView);
                    await req.files.RearView.mv(fullPath,(err)=>{
                        if(err){
                            console.error('ERROR:'+err.message);
                        }
                        else{
                            console.warn('AADHAR PIC MOVED')
                        }
                    });
                }
         
    }
    await MedInfo.create(req.body,(err,result)=>{
        if(err){
            resp.send(err);
            return;
        }
        resp.set('json');
        resp.json({"msg":"RECORD INSERTED"});
        });    
}
async function fetchAllData(req,resp){
    const Regemail=req.params.RegEmail;
    await MedInfo.find({RegEmail:Regemail})
    .then((result)=>{
        resp.json(result);
    })
    .catch((err)=>{
        resp.json({errmsg:err});
    })
}
async function DeleteRecord(req,resp){
    const _id=req.params.id;
    await MedInfo.deleteOne({_id:_id}).then((result)=>
    {
        if(result.deletedCount!==0)
        resp.json({msg:"DELETED"});
        else
        resp.json({msg:"INVALID ID"});
    })
    .catch((err)=>{
        console.log(err);
    })
}
async function fetchCities(req,resp){
    await MedInfo.distinct('city').then((result)=>{
         resp.json(result);
    })
    .catch((err)=>{
    console.log(err); 
    })
}
async function fetchMed(req,resp){
    let city=req.params.e;
    await MedInfo.find({city:city}).then((result)=>{
        const uniqueObjects = [...new Map(result.map(item => [item.MedName, item])).values()]//unique elements
        resp.json(uniqueObjects);
    })
    .catch((err)=>{
        console.log(err);
})

}
async function fetchMedicine(req,resp){
    let {MedName,City}=req.params;
    await MedInfo.find({MedName:MedName,city:City}).then((result)=>{
        resp.json(result);
    })
    .catch((err)=>{
        console.log(err);
})
}
module.exports={createMedInfo,fetchAllData,DeleteRecord,fetchCities,fetchMed,fetchMedicine}