const mongoose=require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'

//set up mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db = mongoose.connection;
db.on('connected',()=>{
    console.log('connected to MongoDB server');
});
db.on('error',(err)=>{
    console.log('MongoDB connection error :',err);
});
db.on('disconnected',()=>{
    console.log('MongoDB is disconnected');
});

module.exports=db;