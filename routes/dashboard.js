const express=require('express');
const router = express.Router();
const humidModel=require('../model/humid.model')
const tempModel=require('../model/temp.model')
const soilModel=require('../model/soil.model')


router.get('/',async(req,res)=>{
    const tempMax=await tempModel.find().sort('-data').limit(1)
    const tempMin=await tempModel.find().sort('data').limit(1)
    const averageTemp=await tempModel.aggregate([
        { $match: {}},
        { $group: {_id: null, average: { $avg: "$data" }}}
    ])
    const averTemp=averageTemp[0].average.toFixed(2);

    const humidMax=await humidModel.find().sort('-data').limit(1)
    const humidMin=await humidModel.find().sort('data').limit(1)
    const averageHumid=await humidModel.aggregate([
        { $match: {}},
        { $group: {_id: null, average: { $avg: "$data" }}}
    ])
    const averHumid=averageHumid[0].average.toFixed(2);

    const soilMax=await soilModel.find().sort('-data').limit(1)
    const soilMin=await soilModel.find().sort('data').limit(1)
    const averageSoil=await soilModel.aggregate([
        { $match: {}},
        { $group: {_id: null, average: { $avg: "$data" }}}
    ])
    const averSoil=averageSoil[0].average.toFixed(2);

    res.render('dashboard/dashboard',{
        tempMax: tempMax, 
        tempMin: tempMin, 
        averTemp: averTemp, 
        
        humidMax: humidMax, 
        humidMin: humidMin, 
        averHumid: averHumid,

        soilMax: soilMax,
        soilMin: soilMin,
        averSoil: averSoil
    })
})

module.exports = router