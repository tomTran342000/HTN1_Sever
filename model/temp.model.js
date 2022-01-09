const mongoose=require('mongoose')
const dataTemp=new mongoose.Schema({
    data:{type:Number},
    id:{type:Number}
},{timestamps:true})

module.exports=mongoose.model('temp',dataTemp)