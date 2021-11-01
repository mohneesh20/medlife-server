// const http=require('http'); 
const axios=require('axios');
async function SendSMS(req,resp){
    let {mobile}=req.params;
    console.log(mobile);
    let user="bcebti"; 
	let password="909938537"; 
	let senderid="SUNSFT";
    // let mobile='8837758349'; 
    let r = Math.random().toString(36).substring(4)
    let url=`http://bulksms.mysmsmantra.com:8080/WebSMS/SMSAPI.jsp?username=${user}&password=${password}&sendername=${senderid}&mobileno=${mobile}&message=${r}`;
    await axios.post(url).then((result)=>{
        console.log(result);
        resp.set('json');
        resp.json({msg:'MSG SENT'});
    })
    .catch((err)=>{
        console.log(err);
    })
}
module.exports={SendSMS}