// Day: 45
// Date: 11/11/2025
// Day: Tuesday

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
let jwt = require('jsonwebtoken')

let User = require('./user')
let bcrypt = require('bcrypt')


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
         res.send("Login doneeeee.....");
      }
      else{
         res.send("Password galat hai...");
      }
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