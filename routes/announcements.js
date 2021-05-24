const express = require('express');
const { addAnnoucements, addComment, reply, getAnnoucements, deleteAnnoucement,
     getAnnoucementByID, editAnouncements, deleteReply, deleteComment } = require('../controller/announcements');
const { isSignedIn, isAuthenticated } = require('../controller/authcontroller');
const { getUserById, getUser, getCourseById } = require('../controller/user');

const router = express.Router();

router.use(express.urlencoded({extended:false}))
router.param("userId",getUserById);
router.param('courseId',getCourseById ); 
 
router.post("/addAnnoucements/:courseId/:userId",isSignedIn,isAuthenticated,getCourseById,getUserById,addAnnoucements);
router.put("/edit/:id",editAnouncements);
router.delete("/deleteAnnoucements/:id",isSignedIn,isAuthenticated,deleteAnnoucement);
router.delete("/delete-reply/:annoucementId/:commentId/:currId",isSignedIn,isAuthenticated,deleteReply);
router.delete("/delete-comment/:annoucementId/:commentId",isSignedIn,isAuthenticated,deleteComment); 
router.post("/comment/:userId/:id",isSignedIn,isAuthenticated,getUserById,addComment); 
router.post("/reply/:userId/:annoucementId/:commentId",isSignedIn,isAuthenticated,getUserById,reply);
router.get("/getAnnoucements/:courseId",isSignedIn,isAuthenticated,getCourseById,getAnnoucements);
router.get("/getAnnoucementbyId/:id",isSignedIn,isAuthenticated,getAnnoucementByID); 
     
 
module.exports = router;