const mongoose=require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/hotels'
//const mongoURL = 'mongodb+srv://sagarjnv878:Sagar9839924714@cluster0.u1ibefc.mongodb.net/'
//const mongoURL = process.env.mongoDB_URL;
//const mongoURL = process.env.MONGODB_URL_LOCAL
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