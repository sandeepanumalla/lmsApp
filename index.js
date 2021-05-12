const Joi = require('joi');
const express = require('express');
const app = express();
require('dotenv/config')
const {Users, userSchema} = require('./models/user');
const cors = require('cors')
const userRoutes = require('./routes/user');
 const authRoutes = require('./routes/authUser')
const  mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
const cookieParser = require('cookie-parser')
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGOURI)
.then(()=>    console.log("succesfully connected to mongodb. "))
.catch((err)=>console.log("error connecting",err))
console.log("mongoport",process.env.MONGOURI)
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
/* app.use(express.urlenstarcoded({extended:false})) */


app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)


app.use('/api/users', authRoutes);
app.use('/api/users', userRoutes);


if(process.env.NODE_ENV === 'production')
{
    console.log("true");
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))  //relative path
    })
}


console.log("secret msg => ",process.env.SECRET)
app.listen(port,()=> console.log(`Listenning on port ${port}`))

