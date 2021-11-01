const nodemailer=require('nodemailer');
async function ndemailer(req,resp){
    const RegEmail=req.params.RegEmail;
    console.log(RegEmail);
    let r = Math.random().toString(36).substring(4)
    let transporter=await nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD,
      },
      tls:{
        rejectUnauthorized:false
      }
    });
    let mailoptions={
      from:'PASSWORD VERIFICATION<medlife009@gmail.com>',
      to:RegEmail,
      subject:'OTP to change password',
      text:'',
      html:`Your OTP is <b>${r}</b>.Please do not share it with anyone.`
    };
    transporter.sendMail(mailoptions,function(err,data){
      if(err){
        console.log("ERROR:")
        console.log(err)
      }
      else{
        resp.set('json');
        resp.json({msg:'OTP SENT',chkcode:r});
      }

    })

 
}
async function Multindemailer(req,resp){
  const EmailArray=req.params.EmailArray;
  const Message=req.params.Message;
  console.warn(EmailArray);
  let transporter=await nodemailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASSWORD,
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  let mailoptions={
    from:'MESSAGE FROM OWNER<medlife009@gmail.com>',
    to:EmailArray,
    subject:'MESSAGE FROM OWNER',
    text:'',
    html:`<h1>${Message}</h1>`
  };
  transporter.sendMail(mailoptions,function(err,data){
    if(err){
      console.log("ERROR:")
      console.log(err)
    }
    else{
      console.log("MESSAGE SENT");
      resp.set('json');
      resp.json({msg:'MAILS SENT'})
    }

  })


}
module.exports={ndemailer,Multindemailer}