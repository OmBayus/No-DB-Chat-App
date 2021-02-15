const express = require("express")
const socketio = require("socket.io")
const http = require("http")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PORT = process.env.PORT || 4000

const Chat = require("./routers/Chat")

const app = express()


const server = http.createServer(app)

const io = socketio(server,{cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
}})

//DataBase

const db = [
      {
            id:"omer1",
            name:"Omer",
            pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C",
            online:false,
            token:""
      },
      {
            id:"ali1",
            name:"Ali",
            pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C",
            online:false,
            token:""
      },
]

//pass: 123

io.on("connection",(socket)=>{

      // socket.id

      //Kullanıcı Girişi
      socket.on("login",data=>{

            const user = db.find((user) => user.name.toLowerCase() === data.name.toLowerCase());

            if(user){
                  bcrypt.compare(data.pass, user.pass, function(err, result) {
                        if (result) {

                              bcrypt.hash(user.id, saltRounds, function(err, hash) {
                                    socket.emit("login",{auth:true,token:hash})
                                    user.token = hash
                              })

                              

                        }
                        else {
                              socket.emit("login",{auth:false})
                        }
                  });
            }
            else{
                  socket.emit("login",{auth:false})
            }

            
      })

      //Kullanıcı Token Sorgusu
      socket.on("auth",token=>{
            const user = db.find((user) => user.token === token);

            if(user){
                  socket.emit("auth",{auth:true,name:user.name})
            }
            else{
                  socket.emit("auth",{auth:false})
            }  
      })

})

app.use(Chat)

server.listen(PORT,()=>{
      console.log("Server has started on port",PORT);
})