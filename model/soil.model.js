const mongoose=require('mongoose')
const dataSoil=new mongoose.Schema({
    data:{type:Number},
    id:{type:Number}
},{timestamps:true})

module.exports=mongoose.model('soil',dataSoil)