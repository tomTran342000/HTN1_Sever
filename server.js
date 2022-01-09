const express=require('express')
const mongoose=require('mongoose')
const expressLayouts=require('express-ejs-layouts')
const path = require('path')
const app=express()
const indexRouter=require('./routes/index')
const dashboardRouter=require('./routes/dashboard')
const humidModel=require('./model/humid.model')
const tempModel=require('./model/temp.model')
const soilModel=require('./model/soil.model')

//socket.io
const server = require('http').createServer(app)
const {Server}=require('socket.io')
const io=new Server(server)

io.on('connection',(socket)=>{
    console.log('a user connected: '+socket.id)
    socket.on('disconnect',()=>{
        console.log('user disconnected: '+socket.id)
    })
})
//end socket.io

//setting mqtt
const mqtt=require('mqtt');

const clients=mqtt.connect('mqtt://mqtt.flespi.io',{
    username: 'PFMY3OpGZZsL7W5SmQGWYe9WJ44cxxrc031TFeou1E3YqWEAC8moaj8Jd2KApZDf',
    password: '',
    port: 1883
});

clients.on('connect',()=>{
    console.log('mqtt is connected.')
});

clients.on('error',(e)=>{
    console.log('can not connect' +e)
    process.exit(1)
});

clients.subscribe('mqtt/connect')
clients.subscribe('testing')

clients.on('message',async(topic,message)=>{
    if(topic=='mqtt/connect'){
        console.log(message.toString())
    }
    else if(topic=='testing'){
        let mess=Array.from(message);
        let data=String.fromCharCode(mess[0],mess[1],mess[2],mess[3],mess[4],mess[5],mess[6],mess[7],mess[8],mess[9],mess[10]);
        let splitD=data.split(",");
        // console.log(splitD);
        
        const dataTemp=new tempModel({
            data:parseInt(splitD[0],10)
        })
        await dataTemp.save()

        const dataHumid=new humidModel({
            data:parseInt(splitD[1],10)
        })
        await dataHumid.save()

        const dataSoil= new soilModel({
            data:parseInt(splitD[2],10)
        })
        await dataSoil.save()

        io.emit('temp',parseInt(splitD[0],10));
        io.emit('humid',parseInt(splitD[1],10));
        io.emit('soil',parseInt(splitD[2],10));
    }
})

//end mqtt

//setting ejs
app.set('view engine','ejs')

//setting to use publice file
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))

//setting mongoose
const connectMongodb=async()=>{
    try{
        await mongoose.connect('mongodb://localhost/iotProject');
        console.log('connected database succesfully');
    }catch(error){
        console.log(error.message)
        console.log('connection failed')
    }
}

connectMongodb();
//end mongoose

//setting to use express-ejs-layouts
app.use(expressLayouts)
app.set('layout','layouts/main')

app.use('/',indexRouter)
app.use('/dashboard',dashboardRouter)

const port=8080
server.listen(port,()=>{
    console.log('Server on port: '+port)
})