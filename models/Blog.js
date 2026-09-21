const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        default:""
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
  },
  {
    timestamps:true
  }
);

module.exports = mongoose.model("Blog",blogSchema);