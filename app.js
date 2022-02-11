const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { default: helmet } = require('helmet');
const morgan = require('morgan');
const port = 3000;

const users = require('./routes/user.routes');
const chat = require('./routes/chat.routes');
const message = require('./routes/message.routes');
const Chat = require('./models/Chat');
const Message = require('./models/Message');

//middlewares
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());

//routes
app.use('/users', users);
app.use('/chats', chat);
app.use('/messages', message);


mongoose
    .connect("mongodb://localhost:27017/chat-app", { useNewUrlParser: true })
    .then(() => {

        io.on("connection", socket => {
            console.log(`[${socket.id}] socket connected`);
            socket.on('disconnect', reason => {
                console.log(`[${socket.id}] socket disconnected - ${reason}`);
            });

            socket.on('requestChats', async(data) => {
                const { userId } = data; 

                const chats = await Chat.find({
                    users:userId
                }).populate('users')


                socket.emit("getChats", chats);

            });
            
            socket.on("requestMessages", async ({ chat }) => {
                const messages = await Message.find({ chat }).populate("user");
                socket.join(chat);
                io.to(chat).emit("getMessages", messages)
            });

            socket.on("sendMessage", async (data) => {
                const message = new Message({
                    ...data
                });
                await message.save();

                const messages = await Message.find({ chat: data.chat }).populate("user");
                io.to(data.chat).emit("revicedMessage", messages);
            });
            
        });

        server.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    });