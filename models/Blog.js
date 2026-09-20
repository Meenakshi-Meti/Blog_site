const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    blogTitle:{
        type:String,
        required:true,
        trim:true
    },

    blogBody:{
        type:String,
        required:true
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