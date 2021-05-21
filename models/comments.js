const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reqString = {
    type:String,
    required:true,
       
}

const nestedSchema= new Schema({
    // id:ObjectId(),
    username:reqString,
    user_id:reqString,
    content:reqString,
    comments:[this], 
    annoucementId:reqString
});


 
const nestedreplies = mongoose.model('comment',nestedSchema);
module.exports = nestedreplies;