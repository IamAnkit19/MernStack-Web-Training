// Day: 46
// Date: 12/11/2025
// Day: Wednesday

let express = require('express')
let cors = require('cors')
const sendOtp = require('./twilioServices')
const Otp = require('./OtpSchema');
const mongoose = require('mongoose')

let app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://127.0.0.1:27017/OtpSchema").
   then(() => {
      console.log("db conneted...");
   })


app.post('/sendOtp', async (req, res) => {
   const {phoneNumber} = req.body;
   const otp = Math.floor(100000 + Math.random() * 900000);
   const expiresAt = new Date(Date.now() + 1 * 60 * 1000);
   try{
      await sendOtp(phoneNumber, otp);

      const newOtp = new Otp({
         phoneNumber,
         otp,
         expiresAt:expiresAt.toString()
      });
      await newOtp.save();

      res.status(200).send({message: 'OTP sent successfully', otp});
   }
   catch(error){
      res.status(500).send({error: 'Failed to send OTP'})
   }
})

app.post('/verify', async (req,res)=>{
   const {otp} = req.body;
   try{
      const otpInfo = await Otp.findOne({otp});
      if(!otpInfo){
         return res.status(400).send("Otp is Invalid");
      }
      const currTime = new Date();
      if(currTime > otpInfo.expiresAt){
         return res.status(400).send("Otp has expired");
      }
      res.status(200).send("Otp verified successfully");
      await Otp.deleteOne({_id: otpInfo._id});
   }
   catch(error){
      return res.status(400).send("An error occured");
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