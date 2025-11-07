// Day: 42
// Date: 06/11/2025
// Day: Thursday

const { log } = require('console')
let express = require('express')
let app = express()
app.use(express.json())

// Middleware
// app.use('/',(req, res, next)=>{
//     // res.send("Mai nahi jane dunga")
//     // res.send("Chale jao")
//     next()
// })
// app.use('/',(req, res, next)=>{
//     res.send("Mai nahi jane dunga")
//     // next()
// })

// app.get('/',(req,res)=>{
//     res.send("Hello mai hu backend")
// })

// let arr = ["cat", "dog", "cat", "dog"]
// // Path parameter
// app.get('/:ani',(req,res)=>{
//     let {ani} = req.params
//     let data = arr.filter((a)=>{
//         return a == ani;
//     })
//     res.send(data);
// })

// app.use('/search',(req, res, next)=>{
//     // res.send("Mai nahi jane dunga")
//     // console.log("Sending...");
//     // res.send("Chale jao")
//     next()
// })

// Query Parameter
// let arr1 = ["ankit pal", "ankit", "anand", "anand jain"];
// app.get('/search', (req, res)=>{
//     let {firstName, lastName} = req.query
//     console.log(`firstName: ${firstName} lastName: ${lastName}`);
//     res.send(`firstName: ${firstName} lastName: ${lastName}`)
// })

app.post('/data', (req, res)=>{
    let val = req.body //Its initial value will be undefined. To see the data which we send by using body we have to use app.use(express.json())
    console.log(val);
    res.send(val)
})

app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})
// http://localhost:4000/search?firstName=ankit&lastName=pal
// get, post, patch, put



// Commands:
// npm init
// npm i -g nodemon
// npx nodemon start