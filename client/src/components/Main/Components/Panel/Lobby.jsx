import React from "react"
import Picture from "./../../../../Images/lobby-boy.png"

const Lobby = ({onClick})=>{
      
      return(
            <div className="Lobby" onClick={onClick} name="Lobby">
                    <div className="Lobby-img" name="Lobby">
                      <div name="Lobby">
                        <img name="Lobby" src={Picture} style={{width:"100%",borderRadius:"50px"}} alt="img"/>
                      </div>
                    </div>
                    <div name="Lobby" className="Lobby-Description">
                      <h3 name="Lobby">Lobby</h3>
                    </div>
            </div>
      )
}


export default Lobby