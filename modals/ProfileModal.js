const mongoose=require('mongoose');
function ProfileForm(){
     var ProfileSchema=new mongoose.Schema({
        username:String,
        mobile:String,
        address:String,
        city:String,
        gender:String,
        bloodGrp:String,
        homestate:String,
        ProfilePic:String,
        AadharPic:String,
        RegEmail:String,
        dos:{type:Date,default:Date.now}
     },{
      writeConcern: {
         mode:'majorit',
         w:'majority',
         j: true,
         fsync:false,
         wtimeout: 1000
       }
     });
     const ProfileModal=mongoose.model('profileforms',ProfileSchema);
     return ProfileModal;
}
module.exports=ProfileForm;