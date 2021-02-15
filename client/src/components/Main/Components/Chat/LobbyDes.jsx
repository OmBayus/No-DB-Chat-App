import React from "react"
import Picture from "./../../../../Images/lobby-boy.png"

const LobbyDes = ()=>{

      return(
            <div className="chat-description">
                  <div className="chat-lobby-description-img">
                    <img src={Picture} alt="lobby_img" style={{width:"100%",borderRadius:"50px"}}/>
                  </div>
                  <div className="chat-lobby-description">
                    <h3>Lobby</h3>
                  </div>
            </div>
      )
}


export default LobbyDes