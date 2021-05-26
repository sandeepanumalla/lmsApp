const express = require('express');
const {getAllUsers, getUser, getUserById,createCourse,
    getAllCourses,getCourse,getCourseById,
    createAssignment,registerCourse,registeredCourses, getAssignmentByCourse,
     getAllAssignments, submitAssignment, enrolledCourses,getAssignmentById,deleteCourse
    ,deRegisterCourse,deleteAssignment,getSingleAssignment,Evaluations,getAssignmentObject,getEvaluations } = require('../controller/user');
const { isAuthenticated, isSignedIn ,getCourses } = require('../controller/authcontroller');
const { route } = require('./authUser');
const { addAnnoucements, addComment } = require('../controller/announcements');
const router  = express.Router();


// get user, courses by Id
router.param('userId',getUserById);
router.param('courseId',getCourseById );
router.param('assignmentId', getAssignmentById);
router.param('asignmentId', getSingleAssignment);
router.param('objectId', getAssignmentObject);



//get user details after signing in
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)

// Getting particular course for course id
router.get('/:userId/courses/:courseId',isSignedIn, isAuthenticated,getCourse);
 
//create courses by Teacher after that teacher will be enrolled for teaching
router.post('/course/createcourse/:userId',isSignedIn,isAuthenticated, createCourse);
router.get('/courses/enrolled/:userId', isSignedIn,isAuthenticated,enrolledCourses);
router.delete('/:courseId/delete',isSignedIn, isAuthenticated,getCourseById,deleteCourse);
    
//getting all the available courses for registering the course for students
router.get('/student/courses',isSignedIn,isAuthenticated, getAllCourses)

//Registration and deregistration for courses by Student
router.post('/:userId/course/register/:courseId',isSignedIn,isAuthenticated,getUserById,getCourseById,registerCourse)
router.get('/:userId/student/registered',isSignedIn,isAuthenticated,registeredCourses)
/* router.get('/:courseId/student/registerred/:userId',isSignedIn,isAuthenticated,getUserById,getCourseById,) */
router.delete('/:courseId/course/deregister/:userId',isSignedIn,isAuthenticated,getUserById,getCourseById,deRegisterCourse);
 // deregistration of student is  working
 
  
//Posting of assignment by teacher 
router.delete('/delete/:asignmentId',isSignedIn,isAuthenticated,getSingleAssignment,deleteAssignment)
router.post('/courses/new-assignment/:courseId',isSignedIn,isAuthenticated,getCourseById,createAssignment);
router.get('/courses/:courseId/assignment', isSignedIn, isAuthenticated,getCourseById, getAssignmentByCourse);
router.get('/:userId/assignment/:assignmentId',isSignedIn,isAuthenticated,getUserById,getAssignmentById);
router.post('/:userId/courses/:assignmentId', isSignedIn,isAuthenticated,submitAssignment);
router.post('/:objectId/assignment', isSignedIn,isAuthenticated,Evaluations);
/* router.post('/:objectId/assignment', isSignedIn,isAuthenticated,Evaluations); */
router.get('/:asignmentId/assiggnment', isSignedIn,isAuthenticated,getEvaluations);
router.post('/:userId/courses/:courseId/results',isSignedIn,isAuthenticated,getCourseById)


router.post("/addAnnoucement",addAnnoucements);





module.exports =router;