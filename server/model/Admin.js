const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema(
    {
        date:{type:String,required:true},
        event:{type:String,required:true}
    }
)
const EventModel=mongoose.model('admins',UserSchema);
module.exports=EventModel;