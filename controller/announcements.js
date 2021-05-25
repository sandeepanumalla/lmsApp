 

const { ValidationError } = require('joi');
const { deleteMany } = require('../models/Announcements');
const Schema = require('../models/Announcements')
const nestedreplies = require('../models/comments');

 exports.addAnnoucements = async(req,res) =>{
     try{
        const user = new Schema({
            course_id: req.details._id ,
            instructor_id: req.profile._id,
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            image_url: req.body.image_url.trim(),
            video_url: req.body.video_url.trim(),
            
         }) 
         console.log(req.body);
         user.save((err,document)=>{
             if(err || !document){
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
         return res.status(422).json("eroor in saving annoucements")
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
         if(req.body.content.trim().length === 0){
            return res.status(422).json("comment should not be empty");

         } 
         const annoucementId = req.params.id;
         const info = [];
         
        info['username'] = req.profile.uname;
        info['user_id'] = req.profile._id;
        info['content'] = req.body.content.trim();
     //    info['annoucement_id'] = req.body.announcement;
 
        const username = info['username'];
        const content = info['content'];
        const user_id = info['user_id'];
     
        console.log("all ",username,content,user_id);
      
         Schema.findOneAndUpdate({_id:annoucementId},{$push:{
             "comments":{"username":username,
             "user_id":user_id,
             "content": content,
             "type":"comment",
             "comments":[],
             "annoucementId":annoucementId}
         }},{returnOriginal:false})
         .exec((err,document)=>{
             if(err || !document){
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
             if(req.body.content.trim() === 0){
                return res.status(422).json("comment should not be empty");
             }
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
                         parentId:commentId, 
                         type:"reply", 
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

 exports.editAnouncements = async (req,res)=>{
     try{
        if( req.body.title.trim().length >0 && req.body.video_url.trim().length>0 && req.body.description.trim().length >0){
         const announcement = await Schema.findById(req.params.id);
         announcement.title = req.body.title.trim();
         announcement.video_url = req.body.video_url.trim();
         announcement.description = req.body.description.trim(); 

            await (announcement).save((err,document)=>{
                if(err || !document){
                    return res.status(400).json(err) 
                }
                else{
                    return res.status(200).json(document)
                }
            });
         }
         else{
             console.log("please fill out all details")
             return res.status(422).json("please fill out all details")
         }
        
         
     }
     catch(err){
         console.log("err catch ",err);
     }
 }

 exports.deleteReply = async (req,res)=>{
     try{
        
        const AnnouncementId = req.params.annoucementId;
        const info = [];
        const currId = req.params.currId;
         
        const commentId = req.params.commentId;
        console.log("running?",AnnouncementId,commentId);
        Schema.findById(AnnouncementId).exec((err,document)=>{
            if(err || !document){
                return res.json("not found")
            }
            else{
                console.log("deleted oneDFF",document.comments.length);
            
                const findCommentById = (commentId,comments)=>{
                    console.log('running..',comments.length);
                    if(comments.length > 0)
                    {   
                        console.log('running..');
                        for(let i=0;i<comments.length;i++){
                            const comment = comments[i];
                            if(comment._id == commentId){
                                console.log("found ->",comment);
                                
                                return comment;
                            }
                            const nestedComment = findCommentById(commentId, comment.comments);
                            if(nestedComment){
                                return nestedComment;
                            }
                        }
                    } 
 
                }
                 const comment = findCommentById(commentId,document.comments);
                
                const Index = comment.comments.findIndex(item => item._id == currId);
                 comment.comments.splice(Index,1);  
                 document.markModified('dff');
                 
                 console.log("isModified",document.isModified()) ; 
               
                 Schema.findByIdAndUpdate({_id:AnnouncementId},{$set:{
                    "comments":document.comments
                }},(err,success)=>{
                    if(err || !success){
                        return console.log("not found")
                    }
                    else{
                        return console.log("found",success);
                    } 
                })
                 console.log("manipulated",document.comments);
                return res.json(document);
             
            }
        })
     }
     catch(err){
         console.log("error in catch delete comment");
     }
 }
 

 exports.deleteComment = async(req,res)=>{
     try{
         const annoucementId = req.params.annoucementId;
         const commentId = req.params.commentId
         
        await Schema.findOneAndUpdate({_id:annoucementId},{$pull:{comments:{_id:commentId}}},{returnOriginal:false},(err,success)=>{
             if(err || !success){
                 return res.json("not found beta")
             }
             return res.json(success);
         })

     }
     catch(err){
         console.log("err in deleting comment catch!!", err);
     }
 }