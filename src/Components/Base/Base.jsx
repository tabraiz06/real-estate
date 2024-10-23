import { BrowserRouter, Routes, Route,Navigate, Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar"
import TopBar from "../Topbar/TopBar"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import { useContext, useState } from 'react';
import { authContext } from '../../App';
import '../Base/base.css'
import Properties from "../Properties/Properties.jsx"
import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AddProperty from "../Add Property/AddProperty.jsx"
import { EditProperty } from "../Edit Property/EditProperty.jsx"
import { DisplayProperty } from "../Display Property/DisplayProperty.jsx"
import { Loader } from "../Loader/Loader.jsx"

export default function Base(){
    const { isLoggedIn } = useContext(authContext);

    return <>
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={isLoggedIn ? <DashBoard /> : <Navigate to={'/login'} />}/>
            {/* <Route path="/home/add-property" element={<AddProperty/>}/> */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>  
        </Routes>
    </BrowserRouter>
    </>
}

function DashBoard(){
  let navigate = useNavigate();
  const [userdata, setuserdata] = useState("")
  const [properties,setProperties] = useState([])
  const [updated,setUpdated] = useState(false)
  const [isLoading,setIsLoading] = useState(true)

  useEffect(() => {
    let testUrl = "https://real-estate-21ik.onrender.com/test";
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); 
      console.log(token)
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(testUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setuserdata(json)
      } catch (error) {
        console.error('Error', error);
        navigate('/login');
       
      }
    };

    fetchUser();
  }, []);
  

  useEffect( ()=>{
    const token = localStorage.getItem('token'); 
    if (!token) {
      navigate('/login');
      return;
    }

    const getProperties = async ()=>{
      let getPropertyUrl =" https://real-estate-21ik.onrender.com/get-property"
      try{
        let properties = await fetch(getPropertyUrl,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`}
          })

          if(!properties.ok){
            throw new Error(`HTTP error! status: ${properties.status}`);
          }

          let propertiesJson = await properties.json()
          let propertiesData = propertiesJson.data
          setProperties(propertiesData);
          setIsLoading(false)

      }
      catch(error){
        console.error('Error', error);
        navigate('/login');
      }
    }

    getProperties()
  },[updated])

  useEffect(() => {
    preparePropertyList();
}, [properties]);


  function preparePropertyList() {
    
    return properties.map(property => ({
        ppdId: property.ppdId,
        imageUrl: property.imageUrl,
        propertyType: property.basic.buildingType,
        contact: property.general && property.general.mobile && property.general.mobile !== ''? property.general.mobile : "0-0-0-0-0--00-",
        area: property.details && property.details.area?property.details['area']:"",
        views: property.views || "01",
        status: property.status || "Unsold",
        daysLeft: property.daysLeft || "10"
    }
    ));

}

    return <>
     <div className="main">
    <Sidebar/>
      <div className='eleArea'>
        <TopBar userdata={userdata}/>
        <Routes>
          <Route path="/edit-property/:ppdId" element={<EditProperty setUpdated={setUpdated} setIsLoading={setIsLoading}/>}/>
          <Route path="/add-property" element={<AddProperty setUpdated={setUpdated} setIsLoading={setIsLoading}/>}/>
          <Route path="/display-property/:ppdId" element={<DisplayProperty setUpdated={setUpdated}/>}/>
          <Route path="/" element={ isLoading?<Loader/>:<Properties dataArray={preparePropertyList()}/>}/>
        </Routes>
        {/* <Properties dataArray={data} />  */}
      </div>
    </div>
    </>
}
