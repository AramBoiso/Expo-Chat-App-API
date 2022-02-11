const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const router = express.Router();

router.post("/", async(req, res) => {

    const { from, to} = req.body;

    const chat = new Chat({
        users:[from, to]
    });

    await chat.save();

    res.send({
        chat
    });
});

router.get('/:chat/messages', async (req, res) => {
    const { chat } = req.params;

    const messages = await Message.find({ chat }).populate(["from", "to"]);

    res.send(messages);
});

module.exports = router;