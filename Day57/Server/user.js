let mongoose= require('mongoose')

let userSchema = mongoose.Schema({
    name:{
        type:String
    },
    userName:{
        type:String
    },
    email:{
        type:String
    },
    passWord:{
        type:String
    },
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    // role:{
    //     type:String,
    //     enum:["user","admin","instructor"],
    //     default:"user"
    // },
    resetToken: String,
    resetTokenExpiry: Date
})

let User = mongoose.model("User",userSchema)
module.exports=User