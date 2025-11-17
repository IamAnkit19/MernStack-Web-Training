// Day: 49
// Date: 17/11/2025
// Day: Monday

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let jwt = require('jsonwebtoken')

let User = require('./user')
let bcrypt = require('bcrypt')
let crypto = require('crypto');
let {sendEmail} = require('./sendEmail')


// npm i mongoose
// npm i bcrypt

// Role Based Access Control(RBAC)
let app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/RoleBasedAccessControl").
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

app.post('/forget-password', async (req, res)=>{
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

      const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
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

app.get('/public', (req, res) => {
   res.send("Anyone can access it")
})
app.get('/private', checkRole('admin'), (req, res) => {
   res.send("This is protected")
})
app.post('/create', async (req, res) => {
   let { userName, email, passWord, role } = req.body
   console.log(userName, email, "heheh");

   let user = await User.findOne({ email })
   console.log(user, "hiiii");

   if (user) {
      res.send("user jinda haiii")
   }
   else{
      let updatedP = await bcrypt.hash(passWord, 10)
      console.log(updatedP, "HEH");
   
      let userData = new User({
         userName,
         email,
         passWord: updatedP,
         role:role||"user"
      })
      await userData.save()
      res.send("account ban gya hai....")
   }

   //   console.log(userName,email, passWord);
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
         let token = jwt.sign({ email: userInfo.email, role: userInfo.role }, "PRIVATESTRING");
         console.log(token);
         // res.send(`Login successfully... Your token is: ${token}`);
         res.send(`${token}`);
      }
      else{
         res.send("Password galat hai...");
      }
   }
})

// app.post('/validate', async (req, res)=>{
//    let {token} = req.body;
//    let validate = await User.findOne({token})
//    if(!validate || token != validate.passWord){
//       res.status(400).send("Invalid User");
//    }
//    else{
//       res.status(200).send("Valid User")
//    }
// })

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