import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import { ApiError } from './ApiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'

//schema
import User from './Schema/User.js'
import { nanoid } from 'nanoid'
import Blog from './Schema/Blog.js'
import { upload } from './multer.middleware.js'

const server = express()

server.use(express.json({limit: "16kb"}))
server.use(express.urlencoded({extended:true, limit: "16kb"}))
server.use(cors())

try{
    await mongoose.connect(`mongodb+srv://AbhijitSingh:Abhijit123@cluster0.zg6ia3p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
        autoIndex: true
    })
 }catch(err){
    console.log(err.message);
 }

 const verifyJWT = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if( token === null ){
        return res.status(401).json({
            "message":"No access token"
        })
    }
    jwt.verify(token,'5c65d8711924f79302d542f6ed96f5fb1ce11f9d47a8e1fbbd95b7edff998bbd7b6ad08b9515dcdb4eec54abba01610a81a32807a7d', (err, user) => {
        if(err) {
            return res.status(401).json({
                "message": "Invalid token"
            })
        }

        req.user = user.id;
        next();
    })
 }

 const formatDatatoSend = (user) => {
    const access_token = jwt.sign({id: user._id}, '5c65d8711924f79302d542f6ed96f5fb1ce11f9d47a8e1fbbd95b7edff998bbd7b6ad08b9515dcdb4eec54abba01610a81a32807a7d')
    return{
        access_token,
        username: user.personal_info.username,
        profile_img: user.personal_info.profile_img,
        fullName: user.personal_info.fullName
    }
 }
 
const PORT = 7000;

server.post("/signup", (req,res) => {
    const {fullName, email, password} = req.body;

    console.log(req.body);
    
    if(fullName.length < 3){
        throw new ApiError(400, "Nmae must be greater than 3 letters")
    }
    if(!email){
        throw new ApiError(403, "email is required");
    }
    if(!password){
        throw new ApiError(403, "password is required");
    }

    bcrypt.hash(password, 10, (err, hashed_password) => {

        const username = email.split("@")[0];

        let user = new User({
            personal_info: {fullName, email, password: hashed_password, username}
        })

        user.save().then((u) => {
            return res.status(200).json(formatDatatoSend(user));
        })
        .catch((err) => {
            return res.status(500).json({
                "error": err
            })
        })
        
        //console.log(hashed_password);
    })

    

})


server.post("/signin", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ "personal_info.email": email })

    if(!user){
        return res.status(404).json({
            "message": "user not found"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.personal_info.password);

    if(!isPasswordCorrect){
        return res.status(403).json({
            "messsage": "password invalid"
        })
    }

    return res.status(200).json(formatDatatoSend(user));
})

server.post("/blog-post", verifyJWT, upload.single('banner'), async (req, res) => {

    const { title, description, tags, content, draft } = req.body;

    const bannerPath = req.files?.banner[0]?.path;
    
    if(!title.length){
        return res.status(403).json({
            error:"title is required"
        })
    }
    if(!description.length || description.length>200){
        return res.status(403).json({
            error:"title is required"
        })
    }
    
    
    if(!tags.length || tags.length>10){
        return res.status(403).json({
            error:"write some tags to publish blog , maximum 10"
        })
    }

    //const newTags = tags.map(tag => tag.toLowerCase())

    const blog_id = title.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, "-").trim() + nanoid()

    const blog = await Blog.create({
        title, banner:bannerPath, description, content, tags, author: req.user, blog_id, draft: Boolean(draft)
    })

    if(!blog){
        return res.status(500).json({
            error: "Internal server error"
        })
    }

    if(!draft){
        const user = await User.findOneAndUpdate({ _id: req.user }, { $inc : {"account_info.total_posts": 1}, $push : { "blogs": blog._id} })
    }

    return res.status(201).json({
        "message": blog_id,
        "data": req.body
    })

})


server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

