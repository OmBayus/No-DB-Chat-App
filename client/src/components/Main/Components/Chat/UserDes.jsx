import React from "react"
import Picture from "./../../../../Images/profil.jpg"


const UserDes = ({name,online})=>{

      return(
            <div className="chat-description">
                  <div className="chat-user-description-img">
                    <img src={Picture} style={{width:"100%",borderRadius:"50px"}} alt="Userdes_img"/>
                  </div>
                  <div className="chat-user-description">
                    <h5>{name}</h5>
                    <p>{online}</p>
                  </div>
                </div>
      )
}


export default UserDes