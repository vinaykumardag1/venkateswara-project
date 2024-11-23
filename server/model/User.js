const mongoose=require("mongoose")

const NewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})
const NewModel=mongoose.model("users",NewSchema)

module.exports=NewModel