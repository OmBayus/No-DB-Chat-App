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
            token:"",
            socketId:""
      },
      {
            id:"ali1",
            name:"Ali",
            pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C",
            online:false,
            token:"",
            socketId:""
      },
      {
            id:"furkkan1",
            name:"Furkkan",
            pass:"$2b$10$Vwtp6DsdbvY6xeAoUiR2QO/0/hwYIutjJDrnK.000A05d6sOAXN1C",
            online:false,
            token:"",
            socketId:""
      },
]

//pass: 123


var Mesajlar = []



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
                  var users = []
                  user.online = true
                  user.socketId = socket.id
                  db.map((item)=>users.push({name:item.name,online:item.online,id:item.id}))
                  socket.emit("auth",{auth:true,name:user.name,id:user.id,users:users})
                  socket.broadcast.emit("online",users)
            }
            else{
                  socket.emit("auth",{auth:false})
            }  
      })


      //GelenMesajlar
      socket.on("MesajGonderme",(data)=>{
            db.map(user=>{
                  if(user.online){
                        if(data.who === "Lobby"){
                              io.sockets.to(user.socketId).emit("GelenMesaj",{mesaj:data.mesaj,name:data.name,isLobby:true})
                        }
                        else if(data.who.toLowerCase() === user.name.toLowerCase()){
                              io.sockets.to(user.socketId).emit("GelenMesaj",{mesaj:data.mesaj,name:data.name,isLobby:false})
                        }
                  }
                  else{
                        if(data.who === user.name || data.who === "Lobby"){
                              Mesajlar.push(data)
                              console.log(Mesajlar)
                        }
                  }
            })
      })

      //User disconnect

      socket.on("disconnect",()=>{
            const id = socket.id
            
            const user = db.find((user) => user.socketId === id);
            if(user){
                  user.online = false
                  var users = []
                  db.map((item)=>users.push({name:item.name,online:item.online,id:item.id}))

                  socket.broadcast.emit("online",users)
            }
            
      })

})

app.use(Chat)

server.listen(PORT,()=>{
      console.log("Server has started on port",PORT);
})