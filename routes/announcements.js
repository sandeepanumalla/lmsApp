const express = require('express');
const { addAnnoucements, addComment, reply, getAnnoucements } = require('../controller/announcements');
const { isSignedIn, isAuthenticated } = require('../controller/authcontroller');
const router = express.Router();
router.use(express.urlencoded({extended:false}))


router.post("/addAnnoucements",addAnnoucements)
router.post("/comment",addComment);
router.post("/reply/:id",reply);
router.get("/getAnnoucements",getAnnoucements);

module.exports = router;