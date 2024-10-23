import "./properties.css"

import searchicon from "..//../assets/search.svg"
import { useState } from "react";
import Property from "../Property/Property";
import { useNavigate } from "react-router-dom";


const Properties = ({ dataArray }) => {
  let navigate = useNavigate();
  const [find,setfind]=useState("");
 const search=(value)=>{
  setfind(value.target.value);
 }


 const filteredData = dataArray.filter(dataItem => {
  const findLowerCase = find.toLowerCase(); 
  const ppdIdLowerCase = dataItem.ppdId.toLowerCase(); 
  
  if (find.trim() === "") {
      return true;
  }
  if (ppdIdLowerCase.includes(findLowerCase)) {
      return true;
  }
  
  return false;
});

 const handleAddProperty = ()=>{
  navigate('/add-property')
 }
    return (
        <div className="list-container">
          <div className="search-add-property-container">
            <div className="search">
             <input placeholder="Search PPD ID" value={find} onChange={search} className="searchinput" type="text"/>
             <img className="searchicon" src={searchicon} alt="SVG Icon" />      
             </div>

             <button onClick={handleAddProperty}>Add Property</button>
          </div>
          <section className="PData">
        <div className="pdata head"><p>PPDID</p></div>        
        <div className="pdata head"><p>Image</p></div>        
        <div className="pdata head"><p>Property</p></div>        
        <div className="pdata head"><p>Contact</p></div>        
        <div className="pdata head"><p>Area</p></div>        
        <div className="pdata head"><p>Views</p></div>        
        <div>
            <div className="head"><span>Status</span></div>
            </div>
        
            <div className="pdata head"><p>Days Left</p></div>
            <div>  <p className="head">Action</p></div> 
            </section>

             {filteredData.map((dataItem, index) => <Property key={index} propertyData={dataItem} />)}
        </div>
      );
  };
  
  export default Properties;