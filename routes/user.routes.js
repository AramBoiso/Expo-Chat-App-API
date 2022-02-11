const express = require('express');
const Chat = require('../models/Chat');
const router = express.Router();
const User = require('../models/User');

router.get('/:username', async (req, res) => {

    const {username} = req.params;

    const user = await User.findOne({ username});

    res.send(user);
});

router.get('/:username/chat', async (req, res) => {

    const {username} = req.params;
    const { _id } = await User.findOne({ username});

    const chat = await Chat.findOne({ users: _id }).populate('users');

    const members = chat.users.map( user => {
        if(user.username !== username)
            return user;
    });

    res.send({
        chatId: chat._id,
        members
    });
});

router.get('/', async (req, res) => {

    const users = await User.find()

    res.send({
        users
    });
});

router.post('/', async(req, res) => {
    
    const user = new User({
        ...req.body
    });

    await user.save();

    res.send({
        user
    });
});


module.exports = router;