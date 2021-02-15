import React from "react"
import Picture from "./../../../../Images/lobby-boy.png"

const Lobby = ()=>{
      
      return(
            <div className="Lobby">
                    <div className="Lobby-img">
                      <div>
                        <img src={Picture} style={{width:"100%",borderRadius:"50px"}} alt="img"/>
                      </div>
                    </div>
                    <div className="Lobby-Description">
                      <h3>Lobby</h3>
                    </div>
            </div>
      )
}


export default Lobby