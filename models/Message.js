const mongoose = require('mongoose');
const Chat = require('./Chat');
const User = require('./User');

const Message = mongoose.Schema({
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: String,
});

module.exports = mongoose.model("Message", Message);