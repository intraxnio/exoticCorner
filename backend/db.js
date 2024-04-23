const mongoose = require('mongoose');

const username = 'exoticcornerapp';
const password = 'Pe4VjCtbwFNcVbVM';

// var dbUrl= "mongodb+srv://"+username+":"+password+"@cluster0.1u64z5l.mongodb.net/?retryWrites=true&w=majority"

var dbUrl = 'mongodb+srv://'+username+':'+password+'@cluster0.wxolrln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// var dbUrl= process.env.MONGODB_URL;



const connectToMongo = ()=>{
    mongoose.connect(dbUrl).then(()=>{
        console.log('Database connected!!');
    })
    .catch((err) => { console.error(err); });
}

module.exports = connectToMongo;