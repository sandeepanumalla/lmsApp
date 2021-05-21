 
const { ValidationError } = require('joi');
const Schema = require('../models/Announcements')
const nestedreplies = require('../models/comments');

 exports.addAnnoucements = async(req,res) =>{
     try{
        const user = new Schema({
            course_id: req.details._id ,
            instructor_id: req.profile._id,
            title: req.body.title,
            description: req.body.description,
            image_url: req.body.image_url,
            video_url: req.body.video_url,
            
         }) 
         console.log(req.body);
         user.save((err,document)=>{
             if(err){
                 console.log(err);
                return res.status(422).json('error while making an announcement'+err)
             }
             else{
                 console.log(document);
                 return res.status(200).json(document);
             }
         })
     }
     catch(err){ 
         console.log("eroor in saving annoucements")
     }
 }

 exports.getAnnoucements = async(req,res)=>{
     try{
         const courseId = req.details._id;
         Schema.find({course_id:courseId}).exec((err,success)=>{
             if(err){
                 return res.json("error no annoucement found",err)
             }
             else{
                 return res.status(200).json(success);
             }
         })
     }
     catch(err){
         return console.log("err in catch"+err);
     }
 }



exports.deleteAnnoucement = async(req,res)=>{
    const annoucementId= req.params.id;
    try{
       
        Schema.findByIdAndDelete(annoucementId).exec((err,success)=>{
            if(err){
                return res.status(400).json("cannot find the annoucement")
            }
            else{
                return res.status(200).json(success);
            }
        })
    }
    catch(err){
        console.log("error in catch"+err);
    }
}

exports.getAnnoucementByID = async (req,res)=>{
    try{
        const annoucementId = req.params.id;
        Schema.findOne({_id:annoucementId}).exec((err,document)=>{
            if(err){
               return res.status(400).json(err);
            }
            else{
                return res.status(200).json(document)
            }
        })
    }
    catch(err){
        console.log("error in catch getting annoucement by id "+err);
    }
} 

 exports.addComment= async (req,res)=>{
     console.log("annoucmentId",req.params.id);
     try{
         if(req.body.content.length === 0){
            return res.status(422).json("comment should not be empty");

         } 
         const annoucementId = req.params.id;
         const info = [];
         
        info['username'] = req.profile.uname;
        info['user_id'] = req.profile._id;
        info['content'] = req.body.content;
     //    info['annoucement_id'] = req.body.announcement;
 
        const username = info['username'];
        const content = info['content'];
        const user_id = info['user_id'];
     
        console.log("all ",username,content,user_id);
    
         Schema.findOneAndUpdate({_id:annoucementId},{$push:{
             "comments":{"username":username,
             "user_id":user_id,
             "content": content,
             "comments":[],
             "annoucementId":annoucementId}
         }},{returnOriginal:false})
         .exec((err,document)=>{
             if(err){
                return res.status(400).json("error saving annoucement")
             }
             else{
                 return res.status(200).json(document);
             }
         })
      }
      catch(err){
          console.log("err"+err);
      }
  }
 
  exports.reply =  (req,res)=>{
         try{
             console.log("body  ",req.body);
             const AnnouncementId = req.params.annoucementId;
             const info = [];
             const commentId = req.params.commentId;
             
             info['username'] = req.body.uname;
             info['user_id'] = req.profile._id;
             info['content'] = req.body.content;
 
             const username = info['username'];
             const content = info['content'];
             const user_id = info['user_id'];
 
 
             Schema.findById(AnnouncementId).then((success)=>{
                 const findComment = (id,comments)=>{
                     if(comments.length > 0){
                         for(var i=0;i<comments.length;i++){
                             const comment = comments[i];
                             if(comment._id == id){
                                 console.log("--->>>found",comment)
                                 return comment
                             }
                             const nestedComment = findComment(id,comment.comments);
                                 if(nestedComment){
                                     return nestedComment;
                                 }
                             }
                     }
                 }
         
                 const comment = findComment(commentId,success.comments);
                 console.log("founded ",comment);
 
                 const newComment = new nestedreplies(
                     {
                         username: req.profile.uname,
                         user_id: req.profile._id,
                         content: req.body.content,  
                         comments:[],
                         annoucementId:AnnouncementId
                     }
                 )
                 console.log("newcomment  ",newComment);
                 comment.comments.unshift(newComment);
                 // console.log(hallCommen);
                 success.markModified('comments');
 
               return success.save((err,save)=>{
                   if(err){
                       return console.log("error saving"+err)
                   }
                   else{
                         return res.status(200).json(save);
                   }
               })
 
             })
 
           
        }
        catch(err){
            return console.log("catch "+err);
        }
 }