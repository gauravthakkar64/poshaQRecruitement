const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


let lableSchema = new Schema({

    name:String,
    tasks:[String] //To store Multiple task Id in Lable
});


module.exports = mongoose.model('Lable',lableSchema);