const mongoose =  require('mongoose');
const Schema = mongoose.Schema;


let taskSchema = new Schema({

    name:String,
    description:String,
    status:String
  
});


module.exports = mongoose.model('Task',taskSchema);