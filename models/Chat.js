const mongoose = require('mongoose');
const User = require('./User');

const Chat = mongoose.Schema({
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
});

module.exports = mongoose.model("Chat", Chat);