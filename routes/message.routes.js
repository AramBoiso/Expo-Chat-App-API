const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

router.post("/", async (req, res) => {

    const { chat, user, content } = req.body;

    const message = new Message({
        ...req.body
    });

    await message.save();

    res.send({
        message
    });

});


module.exports = router;