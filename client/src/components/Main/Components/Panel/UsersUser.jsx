import React from "react"
import Picture from "./../../../../Images/profil.jpg"


const UsersUser = ({onClick,name,online})=>{
      
      return(
      <div className="Users-user" onClick={onClick} name={name}>
            <div className="Users-user-img" name={name}>
                  <div name={name}>
                        <img src={Picture} style={{width:"100%",borderRadius:"50px"}} alt="img" name={name}/>
                  </div>
            </div>
            <div className="Users-user-Description" name={name}>
                  <h4 name={name}>{name}</h4>
                  <p name={name}>{online ? "Online" : "Offline"}</p>
            </div>
      </div>
      )
}


export default UsersUser