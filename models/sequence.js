const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const sequenceSchema = new mongoose.Schema({
    courseNo:{
        type: Number
    },
    coursename:{
        type: String,
        unique: true
    },
    coursecode:{
        type: String,
       
        unique: true
    },
    instructor:{
        type: String  
    },
    instructor_id:{
        type: String
    },
    students_enrolled:{
       type: String
    },
    Assignment:[{
        assignment_id:{
            type: String,
        },
        assignment_no:{
            type: Number,
        },
       name: {
           type: String,  
       },
       note:{
           type: String,    
       },
       date:{
           type: Date,   
       },
       question:{
           type: String,
       },
       answers:[
           {Student_name:String, answer:String}
       ] ,
       evaluations:[
           {Student_name: String, Grade: String}
    ]
 }
    ],
    Announcement:{
        title:{
            type: String,     
        },
        detail:{
            type: String,  
        },
        video_url:{
            type: String
        },
        comment:{
            type: String,
        }
    }
})


module.exports = mongoose.model('Sequence', sequenceSchema);

/*  module.export = {
    Course : Course,
} 
 exports.Course = Course;
exports.courseSchema = courseSchema;  */