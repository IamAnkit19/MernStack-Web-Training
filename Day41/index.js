// Day: 41
// Date: 04/11/2025
// Day: Tuesday

// File System
// let fs = require('fs')
// fs.writeFileSync('index.txt', "Hello") // Write data in file if it exist or it create a new file and add data
// let data = fs.readFileSync('index.txt') // Read data of file
// console.log(data.toString());
// fs.appendFileSync('index.txt',"Hiii") // Append data in existing data
// fs.unlinkSync('index.txt') // Used to delete file

// Operating System
// let os = require('os')
// console.log(os.arch());
// console.log(os.freemem());
// console.log(os.homedir());
// console.log(os.type());
// console.log(os.hostname());
// console.log(os.cpus());
// console.log(os.platform());
// console.log(os.uptime());
// console.log(os.machine());
// console.log(os.networkInterfaces());
// console.log(os.totalmem());
// console.log(os.userInfo());
// console.log(os.version());
// console.log(os);

let express = require('express')
let app = express()

// Middleware
app.use('/',(req, res, next)=>{
    // res.send("Mai nahi jane dunga")
    // res.send("Chale jao")
    next()
})
app.use('/',(req, res, next)=>{
    res.send("Mai nahi jane dunga")
    // next()
})
app.get('/',(req,res)=>{
    res.send("Hello mai hu backend")
})
app.get('/home',(req,res)=>{
    res.send("Hello mai hu backend")
})
app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})

// Commands:
// npm init
// npm i -g nodemon
// npx nodemon start