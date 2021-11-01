const mongoose=require('mongoose');
function UserModal(){
 const UserSchema=new mongoose.Schema({
    RegEmail:{
        type:String,
        index:true,
        unique:true,
    },
    password:String,
    status:{type:Boolean,default:true}
 },{
    writeConcern: {
        mode:'majorit',
        w:'majority',
        j: true,
        fsync:false,
        wtimeout: 1000
    }
 });
 const UserModal=mongoose.model('users',UserSchema);
 return UserModal;
}
module.exports=UserModal;