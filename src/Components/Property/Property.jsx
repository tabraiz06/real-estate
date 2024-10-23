import "../Properties/properties.css"
import editicon from "..//../assets/edit.svg"
import imgicon from "..//../assets/imgicon.svg"
import visibility from '..//../assets/visibility.svg';
import { useState } from "react";
import cancelsvg from '../../assets/cancel.svg'
import { useNavigate } from "react-router-dom";

export default function Property({propertyData}){
    let navigate = useNavigate()
   const [showImg, setshowImg] = useState(false);
    const handleImg=()=>{
        if (showImg == true) {
            setshowImg(false)
        }else{
        setshowImg(true)
    }
    }

    const handleEditProperty = ()=>{
        let ppdId = propertyData.ppdId
        let editPropertyPath = `/edit-property/${ppdId}`
        navigate(editPropertyPath,{replace:false})
    }

    const handleDisplayProperty = ()=>{
        let ppdId = propertyData.ppdId
        let displayPropertyPath = `/display-property/${ppdId}`
        navigate(displayPropertyPath,{replace:false})
    }


    return<>
        
          <section className="PData">
          {showImg && <div className="showImg">
           
          <img onClick={handleImg} className="cancel-icon" src={cancelsvg} alt="SVG Icon" />
            <img className="showImg-ele"  src={propertyData.imageUrl} alt="Image Not found" /></div>
          }
        <div className="pdata"><p>{propertyData.ppdId}</p></div>        
        <div className="pdata"><a href="#" className="editPro">
                    <img  onClick={handleImg} src={imgicon} alt="SVG Icon" />
                </a></div>        
        <div className="pdata"><p>{propertyData.propertyType}</p></div>        
        <div className="pdata"><p>{propertyData.contact}</p></div>        
        <div className="pdata"><p>{propertyData.area}</p></div>        
        <div className="pdata"><p>{propertyData.views}</p></div>        
        <div>
            <div className="status"><span>{propertyData.status}</span></div>
            </div>
        
            <div className="pdata"><p>{propertyData.daysLeft}</p></div>
            
        <div>  <a href="#" className="editPro">
                    <img  src={visibility} alt="SVG Icon" onClick={handleDisplayProperty}/>
                    <img className="editicon" src={editicon} alt="SVG Icon" onClick={handleEditProperty}/>
                </a></div>    
      </section>
    </>
}