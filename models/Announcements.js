const mongoose = require('mongoose');
const comments = require('./comments');

const reqString = {
    required:true,
    type:String,
}
const Schema = new mongoose.Schema({
    course_id:reqString,
    instructor_id:reqString,
    title:reqString,
    description:reqString,
    image_url:{
        type:String
    },
    video_url:{
        type:String
    },
    comments:[{
        username:reqString,
        user_id:reqString,
        content:reqString,
        type:{type:String},
        comments:[this], 
        annoucementId:reqString
    }],
    // comments:[comments]
},{timestamps:true})

module.exports = mongoose.model('Annoucements',Schema);