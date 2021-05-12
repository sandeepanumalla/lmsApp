const express = require('express');
const router  = express.Router();

const app =express();
const { signup, signin, signout, isSignedIn, isAuthenticated, getUser, getUserById, getCourses} = require('../controller/authcontroller');
const Course =  require('../models/course');
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const mongoose = require('mongoose');

app.set('view-engine', 'ejs');
router.use(express.urlencoded({extended:false}))


router.get('/',(req,res)=>{
    res.send('hello')
})

router.get('/form',(req,res)=>{
    res.render('form.ejs');
})

router.post('/form',(req,res)=>{
    const course = new Course({
        coursename : req.body.coursename,
        coursecode: req.body.coursecode
    });
    course.save((err, course)=>{
        if(err){
            return console.log(err);
        }
        res.status(200).send(course);
    }

    )    
})


// User authentication
router.post('/login', signin)
router.post('/register', signup);
router.get('/signout',signout)


//All testing routes below
router.get('/createcourse', isSignedIn,isAuthenticated,(req,res)=>{
    res.render('form.ejs')
})
router.get('/testroute', isSignedIn,(req,res)=>{
    res.status(200).json(req.auth);
})

module.exports = router;