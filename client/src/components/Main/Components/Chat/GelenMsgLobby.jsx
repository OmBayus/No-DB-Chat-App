import React from "react"


const GelenMsgLobby = (props)=>{

      return(
            <div className="gelen-msg-lobby">
            <div style={{borderBottom:"1px solid rgba(255, 255, 255, 0.22)" , color:"#35cd96"}}>{props.name}</div>
            <div className="gelen-msg">{props.children}</div>
            </div>
      )
}


export default GelenMsgLobby