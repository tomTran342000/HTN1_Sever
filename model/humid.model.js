const mongoose=require('mongoose')
const dataHumid=new mongoose.Schema({
    data:{type:Number},
    id:{type:Number}
},{timestamps:true})

module.exports=mongoose.model('humid',dataHumid)