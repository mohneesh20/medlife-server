const mongoose=require('mongoose');
function MedInfo(){
    var MedInfoSchema=new mongoose.Schema({
    MedName:String,
    Company:String,
    Quantity:String,
    ExpiryDate:Date,
    MedType:String,
    FrontView:String,
    RearView:String,
    city:String,
    homestate:String,
    RegEmail:String,
    },{
        writeConcern: {
          mode:'majorit',
          w:'majority',
           j: true,
           fsync:false,
           wtimeout: 1000
         }
       });
    const MedInfoModal=mongoose.model('medinfos',MedInfoSchema);
    return MedInfoModal;
}
module.exports=MedInfo;