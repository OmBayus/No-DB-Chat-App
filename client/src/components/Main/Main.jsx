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
import GonderilenMsg from "./Components/Chat/GonderilenMsg"
import GelenMsgLobby from "./Components/Chat/GelenMsgLobby"

//Socket
import {socket} from "../../socket"
var kullanici = {id:"",name:""}


function Main() {
  const [isAuth,setAuth] = useState(false)
  const [People,SetPeople] = useState([])
  const [mesajSpace,SetmesajSpace] = useState("")
  
  //Selected Space State
  const [selectedSpace,setSelectedSpace] = useState("Lobby")
  const [durum,setDurum] = useState("Offline")

  //Mesaj
  const [mesaj,setMesaj] = useState("")

  useEffect(()=>{
    let token = Cookies.get("token")

    socket.emit("auth",token)
    
  },[])

  useEffect(()=>{
    socket.on("auth",(info)=>{
          if(info.auth){
            var tempPeople = info.users.filter((item)=> item.id !== info.id)
            SetPeople(tempPeople)
            kullanici= {id:String(info.id),name:String(info.name)}
          }
          else{
                setAuth(true)
          }
    })
  },[])

  useEffect(()=>{
    socket.on("online",(info)=>{
      var tempPeople = info.filter((item)=> item.id !== kullanici.id)
      SetPeople(tempPeople)
    })
  })

  useEffect(()=>{
    socket.on("GelenMesaj",async (data)=>{
      if(data.isLobby){
        let temp = await localStorage.getItem((kullanici.name+"Lobby"));
        if(temp){
          localStorage.setItem((kullanici.name+"Lobby"),(temp+`${data.name}:${data.mesaj}-|-`))
        }
        else{
          localStorage.setItem((kullanici.name+"Lobby"),`${data.name}:${data.mesaj}-|-`)
        }
        
      }
      else{
        if(data.name === kullanici.name){
          let temp = await localStorage.getItem((kullanici.name+data.who));
          if(temp){
            localStorage.setItem((kullanici.name+data.who),(temp+`${data.name}:${data.mesaj}-|-`))
          }
          else{
            localStorage.setItem((kullanici.name+data.who),(`${data.name}:${data.mesaj}-|-`))
          }
        }
        else{
          let temp = await localStorage.getItem((kullanici.name+data.name));
          if(temp){
            localStorage.setItem((kullanici.name+data.name),(temp+`${data.name}:${data.mesaj}-|-`))
          }
          else{
            localStorage.setItem((kullanici.name+data.name),(`${data.name}:${data.mesaj}-|-`))
          }
        }
      }
      let mesajlar = await localStorage.getItem((kullanici.name+selectedSpace));
      SetmesajSpace(mesajlar)
    })
  })

  useEffect(()=>{
    let mesajlar = localStorage.getItem((kullanici.name+selectedSpace));
    SetmesajSpace(mesajlar)
  },[selectedSpace])

  const handleSpace = e=>{
    const name = e.target.getAttribute('name')
    setSelectedSpace(name)

    var secilen = People.find(item=>item.name === name)

    if(secilen){
      if(secilen.online){
        setDurum("Online")
      }
      else{
        setDurum("Offline")
      }
    }
  }

  const handleMesaj = e =>{
    setMesaj(e.target.value)
  }

  const MesajGonderme = (e)=>{
    socket.emit("MesajGonderme",{mesaj:mesaj,name:kullanici.name,who:selectedSpace})
    setMesaj("")
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
              {People.map(item=>(<UsersUser key={item.name} name={item.name} online={item.online} onClick={handleSpace}/>))}
              {/* Map */}
            </div>
          </div>
          <div id="Chat">
            {selectedSpace === "Lobby" ? <LobbyDes/> : <UserDes name={selectedSpace} online={durum}/>}
            <div className="Mesaj">
              <div id="scroll-style" className="chat-space">
                {
                  mesajSpace && mesajSpace.split("-|-").filter(item=>item !=="").map((item,index)=>{
                    var a = item.split(":")
                    if(a[0] === kullanici.name){
                      return(<GonderilenMsg key={index}>{a[1]}</GonderilenMsg>)
                    }
                    else{
                      return(<GelenMsgLobby key={index} name={a[0]}>{a[1]}</GelenMsgLobby>)
                    }
                  })
                }
              </div>
              <div className="send-msg-space">
                <div className="send-msg-text-space">
                <Form.Control size="lg" type="text" onChange={handleMesaj} value={mesaj} placeholder="Type a message" className="send-msg-text"/>
                </div>
                <div className="send-msg-button-space">
                  <Button className="send-msg-button" onClick={MesajGonderme}><AiOutlineSend/></Button>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
     
  );
}

export default Main;
