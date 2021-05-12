require('dotenv').config();
const User = require('../models/user');
const Course = require('../models/course');
const Assignment = require('../models/Assignments')
const express = require('express');
const { json } = require('body-parser');
const { all } = require('../routes/user');
const { response } = require('express');
const { result, indexOf } = require('lodash');

exports.getAllUsers=async (req,res)=>{
    User.find().exec((err, users)=>{
        if(err || !users){
            return res.status(400).json({
                error: "no users found"
            })
        }
         res.json(users);
    })
}



exports.getUserById = (req,res,next,id)=>{
    console.log("userid",id);
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err: err,
                error: "No user was found"
            });
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req,res)=>{
    req.profile.password = undefined;
    return res.json(req.profile);
}



exports.createCourse =  (req,res)=>{

    const course = new Course(req.body) 
   
    course.instructor = req.profile.uname;
    course.instructor_id = req.profile._id;
    const profile = req.profile;
    console.log("PROFILE COSNST IS ",profile);
    course.save((err, course)=>{
        console.log("err",err)
        console.log("course",course)
        if(err){
            return res.status(400).json({
                error: "error registering course",
            })
        }
        console.log(course._id)
       var courses = {
            course_id: course._id
       }
       
      return  res.json(course);
    })
}



exports.getAllCourses = (rea,res)=>{
    Course.find().exec((err,allCourses)=>{
        if(err){
            return res.status(400).json({
                error: "error listing all courses"
            })
        }
        return res.json(allCourses);
    })
}

exports.getCourseById = (req,res,next,id)=>{
    
    console.log("getcoursecalled,",id);
    Course.findById(id).exec((err,course)=>{
        if(err || !course){
             res.status(400).json({
                err: err,
                error: "No course was found"
            });
        }
        
        req.details = course;
        console.log("this this, ",req.details);
        next();
    })
}
exports.registerCourse=(req,res)=>{
    console.log(req.details._id);
     Course.findByIdAndUpdate({_id:req.details._id},{$push:
        {"students_enrolled":req.profile._id
    }},(err,registered)=>{
        if(err){
            res.status(400).json({
                err: "error registering course"
            })
        }
        res.json(registered);
   })
}


exports.getCourse = (req,res)=>{
    return res.json(req.details);
}

exports.createAssignment=(req,res)=>{
    const assignment = new Assignment(req.body);
    assignment.course_id = req.details._id;
    assignment.save((err,save)=>{
        if(err){
            return res.status(400).json({
                error : "error saving assignment",
                err: err
            })
        }
        return res.json(save);
    })
}

exports.registeredCourses=(req,res)=>{
    /*  return console.log("this is req.details",req.details) */
    console.log("registeredcourses running",req.profile._id)
    Course.find({students_enrolled: req.profile._id}).exec((err,result)=>{
        if(err){
            return res.status(400).json({
                message:"you are not registered in any course!! or error finding your courses"
            })
            console.log(err);
        }
        res.json(result);
        
    })
}

exports.checkRegisterCourse = (req, res)=>{
    const profile = req.profile;
    const details = req.details._id;
    const s = details.toString()
   const checked =details.students_enrolled
   checked.find(element => element === details)
   console.log("cehe",checked)
}

exports.enrolledCourses=(req,res)=>{
    Course.find({instructor_id : req.profile._id}).exec((err,result)=>{
        if(err){
            return res.status(400).json({
                err: "No courses enrolled or error finding them"
            })
            console.log(err);
        }
        res.json(result);  
    })
}


exports.getAllAssignments = (req,res) => {
    Assignment.find().exec((err,assignment)=>{
        if(err){
            return res.json({
                error: "No assignments found"
            })    
        }
        res.assign = assignment
    })
}


exports.getAssignmentByCourse = (req,res,next)=>{
    console.log("course id is,",req.details._id);
    Assignment.find({course_id: req.details._id}).exec((err,ass)=>{
        if(err || !ass){
            return res.status(400).json({
                err: err,
                error: "No ass was found"
            });
        }
        console.log(ass);
        res.json(ass)
        next();
    })
   
}


exports.getAssignmentById = (req,res,next,id)=>{
    Assignment.findById(id).exec((err,result)=>{
        if(err){
            res.status(400).json({
                err:"error finding assignment"
            })
        }
        if(req.profile.role === 'Teacher'){
            res.json(result)
           
            console.log("main block called")
           
        }
        
        
        
        console.log("req pr,",req.profile)
        req.info = result;
        console.log("get ass,",req.info)
        next();

    })
}

exports.getSingleAssignment=(req,res,next,id)=>{
    console.log("is is",id)
    Assignment.findById(id).exec((err,success)=>{
        if(err){
            return res.status(400).json({
                err: "not able to find the ass"
            })
            console.log("err ",err)
        }
        console.log("succ",success)
        req.information = success;
        next();
    })
}

exports.submitAssignment = (req,res)=>{
    courseid = req.info._id;
    console.log("course id is,",req.info._id);
 

        var info = [];
        info['student'] = req.profile.uname;
        info['student_id'] = req.profile._id;
        info['solution'] = req.body;

        student = info['student'];
        student_id = info['student_id'];
        solution = info['solution'];
        console.log("student array is ,",student)
        console.log("student_id  is ,",student_id)
        console.log("solution array is ,",solution.value)

        Assignment.findOneAndUpdate({_id: req.info._id},{$push:
            {"solutions":{student:student, student_id:student_id,solution: solution.value,results:""}
        }}).exec((err,saved)=>{
            if(err){
                console.log("course._id is " ,courseid);
                        console.log(err);
                        console.log("err pushing solutions")
            }
            else{
                 res.json("submitted successfully")
                  console.log("saved is=> ",saved);
              }
        })
       
      
}

exports.deleteCourse = (req,res)=>{
    Course.findByIdAndDelete(req.details._id).exec((err,success)=>{
        if(err){
            res.status(400).json({
                err: "eroor deleting course"
            })
            console.log("error,",err)
        }
        else{
            res.json("successfully deleted course!")
            
        }
    })
} 


exports.deRegisterCourse = (req,res)=>{
    Course.findOne({_id:req.details._id}).exec((err,success)=>{
        if(err){
            res.status(400).json({
                err: "eroor deregistering course"
            })
            console.log("error,",err)
        }
        
            res.json(success)
             var records = {'records': success}
             var profile = req.profile._id;
             var index = success.students_enrolled.indexOf(profile);
             
            success.students_enrolled.splice(index,1)
            console.log("sd",records);
            success.save((err)=>{
                if(err){
                    console.log("error saving the deregistered data",err)
                }
            
            })
            
        
    })
} 

exports.deleteAssignment=(req,res)=>{
    console.log("req.info, ",req.information)
    Assignment.findByIdAndDelete(req.information.id).exec((err,result)=>{
        if(err){
            res.status(400).json({
                err:"error finding assignment"
            })
        }
    res.json("succesfully deleted assignment")
    }
    )
}

exports.getAssignmentObject = (req,res,next,id)=>{
     req.id = id;
    next()
}

exports.Evaluations =(req,res)=>{
    console.log("req.id",req.id);
  
    Assignment.findOne({"solutions._id": req.id.toString()}).exec((err,success)=>{
        if(err){
            res.status(400).json({
                err:" not found!!"
            })

        }
        const item = success.solutions.find(element=>element._id ==  req.id.toString())
        item['results']=req.body.value;
        const info = item['results'];
        console.log("valuesofitem",info);
        success.save((err,success)=>{
            if(err){
                console.log("err in pushing results",err)
            }
            console.log("success!!!!!")
            res.json("success!!!!!")
        })
  
        console.log("hhhhhh",success);
        console.log("h",item);
      
   
    })
}


exports.getEvaluations =(req,res)=>{
    console.log("req.info",req.information);
  
    Assignment.findOne({_id: req.information}).exec((err,result)=>{
        if(err){
           
            console.log("err",err)
        }
        
      
        console.log("success!!!!! ",result)
        res.json(result)
        })
      
        
    
}


/* 
exports.submissionStatus = (req,res)=>{
    
        Assignment.findOne({course_id: courseid},(err, saved)=>{
            if(err){
                console.log("course._id is " ,course_id);
                console.log(err);
                console.log("err pushing solutions")
            }
            else{
                console.log("saved is=> ",saved);
                req.submissions = saved;
            }
        }) */
        /* res.json("Submitted successfully"); */

