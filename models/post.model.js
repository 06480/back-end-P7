const mongoose = require('mongoose');

const PostModel = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type:String, required: true, trim: true, maxlength: 500 },
    imageUrl: { type: String },
    likers: { type: [String], required: true}   
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Post', PostModel)