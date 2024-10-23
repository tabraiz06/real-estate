import "./topbar.css";
import usersvg from "../../assets/usericon.svg"
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function TopBar({userdata}){
  let navigate=useNavigate();
  let logout=()=>{
   
    localStorage.removeItem("token")
    navigate("/login")

  }
    const [displayProfile, setdisplayProfile] = useState({display:"none"});
    const displayProfilefn = () => {
        if (displayProfile.display === "none") {
          setdisplayProfile({ display: "block" });
        } else {
          setdisplayProfile({ display: "none" }); 
        }
      };
    return (
    <div className="nav">
       <div className="navele"><span className="userid">USER ID:  {userdata.userID}</span> 
       <a href="#" className="userprofile" onClick={displayProfilefn}>
                    <img  className="usericon" src={usersvg} />
                    <span className="button-name">{userdata.email}</span> 
                </a>
        <div style={displayProfile  }  className="profiledata">
          <div className="pcon"><img  className="profileimg" src={usersvg} /></div>
        
        <div className="pcon"><span>Username:- {userdata.username} </span></div>
        <div className="pcon"><span>Email:- {userdata.email} </span></div>
        
          <button onClick={logout} className="logout">LOG OUT</button>
        </div>        
       </div>
 
    <div className="navline"></div>              
    </div>
    );
}