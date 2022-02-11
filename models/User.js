const mongoose = require('mongoose');

const User = mongoose.Schema({
    username: String,
    role: String
});

module.exports = mongoose.model("User", User);