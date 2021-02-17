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
import GelenMsgLobby from "./Components/Chat/GelenMsgLobby"

//Socket
import {socket} from "../../socket"


function Main() {
  const [isAuth,setAuth] = useState(false)
  const [name,setName] = useState("")
  
  //Selected Space State
  const [selectedSpace,setSelectedSpace] = useState("Lobby")

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

  const handleSpace = e=>{
    const name = e.target.getAttribute('name')
    setSelectedSpace(name)
  }

  return (
      <div id="Page">
        {isAuth && <Redirect to="/" />}
        <div style={{height:"2vh"}}></div>
        <div id="Main">
          <div id="Panel">
            <User/>
            <div id="Users">
              <Lobby onClick={handleSpace}/>
              {/* Map */}
              <UsersUser name="Omer" online={true} onClick={handleSpace}/>
              <UsersUser name="Ali" online={false} onClick={handleSpace}/>
              <UsersUser name="Furkkan" online={false} onClick={handleSpace}/>
              <UsersUser name="Fırat" online={true} onClick={handleSpace}/>
              {/* Map */}
            </div>
          </div>
          <div id="Chat">
            {selectedSpace === "Lobby" ? <LobbyDes/> : <UserDes name={selectedSpace} online="Offline"/>}
            <div className="Mesaj">
              <div id="scroll-style" className="chat-space">
                <GelenMsgLobby name="Ömer">Sa</GelenMsgLobby>
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
