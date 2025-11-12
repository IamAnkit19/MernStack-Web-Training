// Day: 46
// Date: 12/11/2025
// Day: Wednesday

let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')
const sendOtp = require('./twilioServices')

let app = express()
app.use(cors())
app.use(express.json())
// mongoose.connect("mongodb://127.0.0.1:27017/5thSem").
//    then(() => {
//       console.log("db conneted...");
//    })


app.post('/sendOtp', async (req, res) => {
   const {phoneNumber} = req.body;
   const otp = Math.floor(100000 + Math.random() * 900000);
   try{
      await sendOtp(phoneNumber, otp);
      res.status(200).send({message: 'OTP sent successfully', otp});
   }
   catch(error){
      res.status(500).send({error: 'Failed to send OTP'})
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
// npm i bcrypt