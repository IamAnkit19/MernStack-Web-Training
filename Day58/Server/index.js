// Day: 58
// Date: 28/11/2025
// Day: Friday

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let jwt = require('jsonwebtoken')
let User = require('./user')
let bcrypt = require('bcrypt')
let crypto = require('crypto');
let {sendEmail} = require('./sendEmail')
let Upload = require('./Upload');
let Comment = require('./Comment');

// npm i mongoose
// npm i bcrypt

let app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/Instagram").
   then(() => {
      console.log("db conneted...");
   })

function checkRole(role){
   return (req, res, next)=>{
      let token = req.headers.authorization;
      if(!token){
         return res.send("Unauthorized User!")
      }
      else{
         let decodedToken = jwt.verify(token, "PRIVATESTRING");
         if(role !== decodedToken.role){
            return res.send("Access Denied!")
         }
         else{
            next()
         }
      }
   }
}
function auth(req, res, next) {
    const token = req.headers.authorization;
    // console.log("hello",token);
    if (!token) return res.status(401).json({ message: "Login first!" });

    try {
        const decoded = jwt.verify(token, "PRIVATESTRING");
        req.user = decoded;   // IMPORTANT: req.user yahi se aata hai
        console.log("decoded",decoded);
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

app.post('/reset-password', async (req, res)=>{
   const {email} = req.body;
   try{
      const user = await User.findOne({email});
      if(!user){
         return res.status(404).send('User Not Found');
      }
      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetToken = resetToken;
      user.resetTokenExpiry = Date.now() + 3600000;
      await user.save()

      // const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
      const resetUrl = `http://localhost:5173/reset/${resetToken}`
      await sendEmail(
         user.email,
         'Password Reset Request',
         `Click the link below to reset your password:\n\n${resetUrl}`
      );

      res.status(200).send('Password reset email sent');
   }
   catch(error){
      res.status(500).send('Error sending password reset email: ' + error.message);
   }
})

app.post('/reset-password/:token', async (req, res) => {
   const { token } = req.params;
   const { newPassword } = req.body;

   try {
   const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Check token validity
   });

   if (!user) {
      return res.status(400).send('Invalid or expired token');
   }

   // Hash the new password
   const hashedPassword = await bcrypt.hash(newPassword, 10);
   user.passWord = hashedPassword;
   user.resetToken = undefined;
   user.resetTokenExpiry = undefined;
   await user.save();

   res.status(200).send('Password reset successfully');
   } catch (error) {
   res.status(500).send('Error resetting password: ' + error.message);
   }
});

app.get('/public', (req, res) => {
   res.send("Anyone can access it")
})
app.get('/private', checkRole('admin'), (req, res) => {
   res.send("This is protected")
})
app.post('/create', async (req, res) => {
   let { name, userName, email, passWord } = req.body
   console.log(userName, email, "heheh");

   let user = await User.findOne({ email })
   console.log(user, "hiiii");

   if (user) {
      res.status(200).send("User already have an account")
   }
   else{
      let updatedP = await bcrypt.hash(passWord, 10)
      // console.log(updatedP, "HEH");
   
      let userData = new User({
         name,
         userName,
         email,
         passWord: updatedP
      })
      await userData.save()
      res.status(200).send("Account created")
   }
})

app.post('/login',async (req, res)=>{
   let {email, passWord} = req.body
   let userInfo = await User.findOne({email})
   if(!userInfo){
      res.send("Account not found!");
   }
   else{
      let validPass = await bcrypt.compare(passWord,userInfo.passWord);
      if(validPass){
         let token = jwt.sign({_id:userInfo._id, email: userInfo.email, userName:userInfo.userName }, "PRIVATESTRING");
         console.log(token);
         // res.send(`Login successfully... Your token is: ${token}`);
         res.status(200).send(`${token}`);
      }
      else{
         res.status(404).send("Wrong Password");
      }
   }
})

app.post('/upload', auth, async (req,res)=>{
   const userId = req.user._id;
   let {imgUrl} = req.body;
   if(!imgUrl){
      return res.send("Url not found");
   }
   let uploadData = new Upload({
      imgUrl,
      user: userId,
      likedBy: []
   })
   await uploadData.save();
   return res.send("Image Uploaded");
})

app.get('/posts', auth, async(req, res)=>{
   // console.log("Arrived here");
   try{
      let data = await Upload.find().populate('user', 'userName');
      // res.json(data);
      // for(let i=0; i<data.length; i++){
      //    // console.log(data[i].user);
      //    let userName = await User.findById(data[i].user);
      //    data[i].userName = userName.userName;
      //    console.log(data[i]);
      // }
      res.send(data);
   }
   catch(error){
      console.log(error);
      res.status(500).send("Server Error!");
   }
})

app.post("/like/:id", auth, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Upload.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

   
    post.likedBy = post.likedBy.filter(id => id !== null);


    const alreadyLiked = post.likedBy.some(
      id => id.toString() === userId.toString()
    );

    // --------------------------------
    // 🔴 UNLIKE (agar like kiya hua hai)
    // --------------------------------
    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter(id => id.toString() !== userId.toString());
      post.likeCount = Math.max(0, post.likeCount - 1);

      await post.save();
      return res.json({
        success: true,
        message: "Disliked",
        likeCount: post.likeCount
      });
    }

    // --------------------------------
    // 🟢 LIKE (agar pehle like nahi kiya)
    // --------------------------------
    post.likedBy.push(userId);
    post.likeCount += 1;

    await post.save();
    return res.json({
      success: true,
      message: "Liked",
      likeCount: post.likeCount
    });

  } catch (err) {
    console.log("LIKE API ERROR:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post('/follow/:id',auth,async (req, res)=>{
   let targetUserId = req.params.id;
   let currentUserId = req.user._id;
   if(targetUserId == currentUserId){
      return res.json({msg:"Are you joking..."});
   }
   let targetUser = await User.findById(targetUserId);
   let currentUser = await User.findById(currentUserId);
   if(!currentUser || !targetUser){
      return res.send("User not found")
   }
   let alreadyFollow = currentUser.following.includes(targetUserId);
   // Unfollow
   if(alreadyFollow){
      currentUser.following = currentUser.following.filter(
         id => id.toString() !== targetUserId.toString()
      );

      targetUser.followers = targetUser.followers.filter(
         id => id.toString() !== currentUserId.toString()
      );
      await currentUser.save();
      await targetUser.save();
      return res.json("Unfollowed");
   }

   // Follow
   currentUser.following.push(targetUserId);
   targetUser.followers.push(currentUserId);
   await currentUser.save();
   await targetUser.save();
   return res.json("Followed");
})

// Search user
app.post("/search", async (req,res)=>{
   let query = req.query.q;
   if(!query){
      return res.send("Query Not Found!");
   }
   let isMatch = await User.find({
      $or:[
         {name:{$regex:query, $options:"i"}},
         {email:{$regex:query, $options:"i"}}
      ]
   }).select("-passWord").limit(5)  // Here - denotes that it is not sent
   console.log(isMatch);
   return res.json({msg:isMatch});
})

// Comment
app.post('/comment/:id', async (req, res)=>{
   try {
      const postId = req.params.id;
      //  const userId = req.user._id;
      const {text, userId} = req.body;

      if(!text || !userId || !postId){
         return res.status(400).json({msg: "text, userId, postId required"})
      }
      const newComment = new Comment({
         text,
         postId,
         userId
      });
      console.log(newComment._id);
      
      await newComment.save();
      return res.status(201).json({msg:"Commented"})
   }
   catch(error){
      return res.send(error);
   }
})

app.post('/deleteComment/:id', async (req, res)=>{
   try{
      const postId = req.params.id;
      const commentId = req.body;
      if(!postId || !commentId){
         return res.status(400).json({msg:"postId, commentId rrquired"});
      }
      const comment = Comment.findOne({commentId});
      if(!comment){
         return res.status(404).json({msg:"Comment not found!"});
      }
   }
   catch(error){
      return res.send(error);
   }
})

app.listen(4000, () => {
   console.log("server running on port no 4000");
})

// use dbs


// Commands:
// npm init
// npm i express
// npm i -g nodemon
// npx nodemon start
// mongosh
// npm i mongoose