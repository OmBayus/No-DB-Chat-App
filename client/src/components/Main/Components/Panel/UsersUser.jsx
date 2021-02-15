import React from "react"
import Picture from "./../../../../Images/profil.jpg"


const UsersUser = ()=>{
      
      return(
      <div className="Users-user">
            <div className="Users-user-img">
                  <div>
                        <img src={Picture} style={{width:"100%",borderRadius:"50px"}} alt="img"/>
                  </div>
            </div>
            <div className="Users-user-Description">
                  <h4>UserName</h4>
                  <p>Çevrimiçi</p>
            </div>
      </div>
      )
}


export default UsersUser