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
          console.log("user initialized: ", userId);
        });

        socket.on("join", (roomId) => {
            socket.join(roomId);
            console.log(`User joined room : ${roomId}`);
        })

        socket.on("sendNotification", async({senderId, content}) => {

            console.log(senderId, content);
            const allUsers = await userModel.find({});

            // await Promise.all(
            //     allUsers.map(async(user)=>{
            //         if(user._id !== senderId){
            //             console.log(`sent to ${user._id}`);
            //             socket.to(user._id).emit("recieveNotification", content);
            //         }
            //     })
            // )
            io.to('singleRoom').emit("recieveNotification", content)
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