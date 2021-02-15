import React from "react"
import Picture from "./../../../../Images/profil.jpg"


const UserDes = ()=>{

      return(
            <div className="chat-description">
                  <div className="chat-user-description-img">
                    <img src={Picture} style={{width:"100%",borderRadius:"50px"}} alt="Userdes_img"/>
                  </div>
                  <div className="chat-user-description">
                    <h5>UserName</h5>
                    <p>Çevrimiçi</p>
                  </div>
                </div>
      )
}


export default UserDes