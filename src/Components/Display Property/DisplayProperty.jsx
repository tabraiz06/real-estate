import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router-dom";
import '../Display Property/displayProperty.css'
import propertyForm from "../Properties/PropertyForm";
import { Loader } from "../Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export function DisplayProperty({setUpdated}){
    let navigate = useNavigate()
    let {ppdId} = useParams()
    const [displayProperty,setDisplayProperty] = useState({basic: {}, details: {}, general: {}, location: {}, imageUrl: ""})
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/login');
          return;
        }
    
        const getProperties = async ()=>{
            let getPropertyUrl = "http://localhost:8080/get-property";
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

              //filtering properties with matching ppdId

              let propertyWithId = propertiesData.filter(property=>property.ppdId===ppdId)
              setDisplayProperty(propertyWithId[0]);
              setIsLoading(false)
          }
          catch(error){
            console.error('Error', error);
            navigate('/login');
          }
        }
    
        getProperties()
    },[ppdId])

  
    return isLoading ? (
        <Loader/>
    ) : (
        <PropertyDetails displayProperty={displayProperty} ppdId={ppdId} setUpdated={setUpdated} />
    );
}

function PropertyDetails({displayProperty,ppdId,setUpdated}){
    let navigate = useNavigate()
    const [displayBackupImage,setDisplayBackupImage] = useState(true)

    const handleEditProperty = ()=>{
        let editPropertyPath = `http://localhost:8080/edit-property/${ppdId}`;
        navigate(editPropertyPath,{replace:false})
    }

    const handleGoHome = ()=>{
        navigate("/",{replace:false})
    }

    const loadBackupImage = ()=>{
        setDisplayBackupImage(false)
    }

    const handleDeleteProperty = async ()=>{
        let deletePropertyUrl = `http://localhost:8080/delete-property/${ppdId}`;
        let token = localStorage.getItem('token')

        if(!token){
            navigate("/login")
            return
        }

        try{
            let response = await fetch(deletePropertyUrl,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    
            if(!response.ok){
                alert("unable to delete property")
                console.log(response.statusText)
                return
            }

            if(response.status===204){
                alert("deleted property successfully")
                setUpdated(prev=>!prev)
                navigate("/")
                return
            }
        }

        catch(error){
            console.log("unable to delete",error)
            return
        }
    }

    return <>
    <div className="display-container">
        <h1 className="display-header">Property Details</h1>
        <div className="viewImgCon"><img className="viewImg" src= {displayProperty.imageUrl} width="20px" onError={loadBackupImage} hidden={!displayBackupImage}/></div>
        <div className={`backup-house-svg-container ${displayBackupImage?"display-backup":""}`}>
        <FontAwesomeIcon icon={faHouse} size="10x" />
        </div>
        
        <PropertySection title={'Basic'}  data={displayProperty.basic} odd={true}/>
        <PropertySection title={'Details'} data={displayProperty.details} odd={false}/>
        <PropertySection title={'General'}  data={displayProperty.general} odd={true}/>
        <PropertySection title={'Location'} data={displayProperty.location} odd={false}/>
        <div className="button-container">
            <button className="edit-property-button" onClick={handleEditProperty}>Edit</button>
            <button className="goto-home-button" onClick={handleGoHome}>Home</button>
            <button className="delete-property-button" onClick={handleDeleteProperty}>Delete</button>
        </div>
    </div>
    </>
}

function PropertySection({title,data,odd}){
    return <>
    <div className={`section-container ${odd?'odd':""}`}>
        <h2 className="section-header">{title}</h2>
        
        <div className="section-data">
            {data && Object.entries(data).map(([key,value])=>{
                let section = title.toLowerCase()
                return <Field key={key} name={propertyForm[section][key].name} value={value}/>
            })}
        </div>
    </div>
    </>
}

function Field({name,value}){
    return <>
    <div className="field-container">
        <strong>{name} </strong>
        <p>{value}</p>
    </div>
    </>
}