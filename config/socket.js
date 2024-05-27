import { Server } from "socket.io";
import userModel from "../models/user.js";

const configureSocketEvents = (server) =>{
    const io = new Server(server,{
        pingTimeout: 12000,
        cors:{origin:'*'},
    })

    io.on("connection", (socket) => {
        // Initialize user
        socket.on("init_user", (userId) => {
          socket.join('singleRoom');
          socket.emit(`user_connected`);
        });

        socket.on("join", (roomId) => {
            socket.join(roomId);
            console.log(`User joined room : ${roomId}`);
        })

        socket.on("sendNotification", async({content}) => {
            socket.broadcast.emit("recieveNotification", content)
        })

        socket.on("disconnect", ()=>{
            console.log("disconnect init");
        })

        socket.off("join",(userId)=>{
            console.log("user disconnected");
            socket.leave(userId);
        })
    })
}

export default configureSocketEvents