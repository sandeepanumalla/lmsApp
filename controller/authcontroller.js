const Course = require('../models/course')
const bcrypt = require('bcryptjs');
const { identity, escapeRegExp, pickBy } = require('lodash');
const _ = require('lodash');
require('dotenv').config();
const {userRoutes} = require('../index');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt')

const User = require('../models/user');
exports.signup = async (req,res)=>{
    try{  
        const user = new User({
            uname: req.body.uname,
            fname: req.body.fname,
            lname: req.body.lname,
            password: req.body.password,
            role: req.body.role
        });
        let alreadyUser = await User.findOne({uname: req.body.uname});
        if(alreadyUser) {
            return res.status(409).json("User with same username already registered");
        }
        else{
            var salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt)
        const result = await user.save((err, user)=>{ 
            if(err){
                return res.status(400).json({
                    err: "something wrong with the details provided. "+err
                });
            }
            
            res.status(200).send(`user is succesfully register with ${req.body.role} role`);    
        });
        console.log(req.body);
        } 
        
        
        
    } catch(err){
        console.log(err);
        res.redirect('/register')
    }
}

exports.signin = async (req,res)=>{
    try{

        let validUser = await User.findOne({uname: req.body.uname});
        if(!validUser) return res.status(400).json("incorrect Username");

        if(req.body.role !== validUser.role) return res.status(400).json('Invalid role selected');
    
        const validPassword =  await bcrypt.compare(req.body.password, validUser.password);
        if(!validPassword) return res.status(400).json("Incorrect  password");
        
        const token = await jwt.sign({_id: validUser._id},process.env.SECRET);

        res.cookie("token",token);

        const { _id, uname, role} =  validUser;
        
        req.user = validUser;
        console.log("token",token)
        console.log("token",validUser._id)
        console.log(req.user);
        return res.json({token,user:{_id, uname, role}});
       
    }
    catch(err){
        console.log(err);
    }
}


exports.signout=(req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "User signed out successfully"
    });
}
exports.isSignedIn=expressJwt({
    algorithms: ['sha1', 'RS256', 'HS256'],
    secret: "516ff6f7349e9ff70daf55911b02dc5d9a4669c2721ac68f6e7b9c383fa4e2ed6197bfeb837444656534501831e574aaa62370d70b7a0cf0d6aef4e20dff74d5",
    userProperty: "auth",
  
}) 

  
exports.isAuthenticated =  (req,res,next)=>{
    console.log(req.auth);
    let checker =  req.auth._id == req.auth._id;
    if(!checker) return res.status(403).json({
        error:( "Access Denied")
    })
    console.log("fff",req.auth)
    next();
}

exports.getCourses = (req,res)=>{
    const profile = req.auth._id;
    Course.find({instructor_id: profile}).exec((err, yourCourses)=>{
        if(err){
            return res.status(401).json({
                message : " You haven't registered a course"
            })
        }
        res.json(yourCourses);
    }) 
}


/* console.log(process.env.ACCESS_SECRET_TOKEN); */