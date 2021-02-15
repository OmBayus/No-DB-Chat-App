import React from "react"
import {AiFillSetting} from "react-icons/ai"
import Picture from "./../../../../Images/profil.jpg"

const User = ()=>{

      return(
            <div id="User">
                  <div className="User-img">
                    <img src={Picture} style={{width:"100%",borderRadius:"50px"}} alt="img"/>
                  </div>
                  <AiFillSetting className="User-Settings"/>
            </div>
      )
}


export default User