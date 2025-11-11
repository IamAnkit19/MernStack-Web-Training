// Day: 45
// Date: 11/11/2025
// Day: Tuesday

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')

let User = require('./user')
let bcrypt = require('bcrypt')


// npm i mongoose
// npm i bcrypt

let app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/5thSem").
   then(() => {
      console.log("db conneted...");
   })

app.get('/', (req, res) => {
   res.send("hiii")

})
app.post('/create', async (req, res) => {
   let { userName, email, passWord } = req.body
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
         passWord: updatedP
      })
      await userData.save()
      res.send("account ban gya hai....")
   }

   //   console.log(userName,email, passWord);
})

app.listen(4000, () => {
   console.log("server running on port no 4000");

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
         res.send("Login doneeeee.....");
      }
      else{
         res.send("Password galat hai...");
      }
   }
})

// use dbs


// Commands:
// npm init
// npm i express
// npm i -g nodemon
// npx nodemon start
// mongosh
// npm i mongoose