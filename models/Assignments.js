const { date } = require('joi');
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
   
    course_id:{
        type: String
    },
    name: {
        type: String,
    },
    note: {
        type: String
    },
    question:{
        type: String
    },
    solutions:[
        {
            student:{
            type: String,
            unique: true
            }, 
            student_id:{
                type: String,
                unique: true
            },
            solution: String,
            results: Number
        }
    ]

   /*  results:[
        {
            student:{
                type: String,
                unique: true
                }, 
                grade: Number
        }
    ] */
});

module.exports = mongoose.model('Assignment', assignmentSchema);

/* module.export = {
    User : User,
} */
/* exports.Users = Users;
exports.userSchema = userSchema; */