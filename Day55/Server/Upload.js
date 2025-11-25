let mongoose = require('mongoose');
let imageSchema = mongoose.Schema({
    // name:{
    //     type:String
    // },
    imgUrl:{
        type:String,
        required:true
    },
    likesCount:{
        type:Number,
        default:0
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   // reference to user model
        required: true
    }],
})

let Upload = mongoose.model('UploadImage',imageSchema);
module.exports = Upload;