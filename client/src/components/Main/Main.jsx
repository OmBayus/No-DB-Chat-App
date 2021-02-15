import React,{useState,useEffect} from "react"
import {Form,Button} from "react-bootstrap"
import {AiOutlineSend} from "react-icons/ai"
import Cookies from "js-cookie"
import {Redirect} from "react-router-dom"

//Panel Components
import User from "./Components/Panel/User"
import Lobby from "./Components/Panel/Lobby"
import UsersUser from "./Components/Panel/UsersUser"


//Chat Components
import LobbyDes from "./Components/Chat/LobbyDes"
import UserDes from "./Components/Chat/UserDes"
import GelenMsg from "./Components/Chat/GelenMsg"
import GonderilenMsg from "./Components/Chat/GonderilenMsg"

//Socket
import {socket} from "../../socket"


function Main() {
  const [isAuth,setAuth] = useState(false)
  const [name,setName] = useState("")

  useEffect(()=>{
    let token = Cookies.get("token")

    socket.emit("auth",token)
    
  },[])

  useEffect(()=>{
    socket.on("auth",(info)=>{
          if(info.auth){
                setName(info.name)
          }
          else{
                setAuth(true)
          }
    })
  },[])

  return (
      <div id="Page">
        {isAuth && <Redirect to="/" />}
        <div style={{height:"2vh"}}></div>
        <div id="Main">
          <div id="Panel">
            <User/>
            <div id="Users">
              <Lobby/>
              {/* Map */}
              <UsersUser/>
              <UsersUser/>
              <UsersUser/>
              <UsersUser/>
              {/* Map */}
            </div>
          </div>
          <div id="Chat">
            <LobbyDes/>
            {/* <UserDes/> */}
            <div className="Mesaj">
              <div id="scroll-style" className="chat-space">
                <GelenMsg>Sa</GelenMsg>
                <GonderilenMsg>As</GonderilenMsg>
              </div>
              <div className="send-msg-space">
                <div className="send-msg-text-space">
                <Form.Control size="lg" type="text" placeholder="Type a message" className="send-msg-text"/>
                </div>
                <div className="send-msg-button-space">
                  <Button className="send-msg-button"><AiOutlineSend/></Button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
     
  );
}

export default Main;
