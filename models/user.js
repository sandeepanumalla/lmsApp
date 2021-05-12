 const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    uname: {
       type: String,
       required: true,
       unique: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
         required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
    },
    courses:[
       {course_id: String}
    ],
    

});


module.exports = mongoose.model('User', userSchema);

/* module.export = {
    User : User,
} */
/* exports.Users = Users;
exports.userSchema = userSchema; */