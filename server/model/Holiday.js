const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema(
    {
        date:{type:String,required:true},
        holiday:{type:String,required:true}
    }
)
const HolidayModel=mongoose.model('holiday',UserSchema);
module.exports=HolidayModel;