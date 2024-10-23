import { useEffect,  useState } from 'react';
import '../Add Property/addProperty.css'
import propertyForm from '../Properties/PropertyForm';
import { useNavigate } from 'react-router-dom';
import { basicForm,generalForm,locationForm,detailsForm } from './FormData';
import axios from 'axios';

export default function AddProperty({ppdId,setUpdated,setIsLoading}){
    let navigate = useNavigate()
    const [currentForm,setCurrentForm] = useState('basic')
    const [propertyImage,setPropertyImage] = useState("")
  
    
    // const [formData,setFormData] = useState({basic:basicForm,details:{},general:{},location:{},imageUrl:""})
    const [formData, setFormData] = useState(ppdId ? null : {basic: basicForm, details: detailsForm, general: generalForm, location: locationForm, imageUrl: ""});
      
    useEffect( ()=>{
        if (!ppdId) {
            return;
          }

        const token = localStorage.getItem('token'); 
        if (!token) {
          navigate('/login');
          return;
        }
    
        const getProperties = async ()=>{
            let getPropertyUrl = "https://real-estate-21ik.onrender.com/get-property";
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
              setFormData({...propertyWithId[0]});
    
          }
          catch(error){
            console.error('Error', error);
            navigate('/login');
          }
        }
    
        getProperties()
      },[ppdId])


    if (ppdId && formData === null) {
        return null;
      }

    return<>
    <div className='forms-container'>
        <FormNavigation setCurrentForm={setCurrentForm} currentForm={currentForm}/>
        <FormComponent formFields={propertyForm} currentForm={currentForm} setCurrentForm={setCurrentForm} setFormData={setFormData} formData={formData} setPropertyImage={setPropertyImage} propertyImage={propertyImage} ppdId={ppdId} setUpdated={setUpdated} setIsLoading={setIsLoading}/>
    </div>
    </>
}

export function FormNavigation({setCurrentForm,currentForm}){

    const handleCurrentForm = (e)=>{
        if(e.target.className=='clickable'){
            setCurrentForm(e.target.id)
        }
       
    }
    
    
    return <>
     <div className="form-navigation-bar" >
    <div className={`form-navigation-section ${currentForm === 'basic' ? 'active' : ''}`}  onClick={handleCurrentForm}>
        <span className={`sr-number ${currentForm === 'basic' ? 'active' : ''}`}>1</span>
        <span id='basic' className='clickable'>Basic Info</span>
    </div>
    <div className={`form-navigation-section ${currentForm === 'details' ? 'active' : ''}`}   onClick={handleCurrentForm} >
        <span className={`sr-number ${currentForm === 'details' ? 'active' : ''}`}>2</span>
        <span id='details' className='clickable'>Property Details</span>
    </div>
    <div className={`form-navigation-section ${currentForm === 'general' ? 'active' : ''}`}  onClick={handleCurrentForm}>
        <span className={`sr-number ${currentForm === 'general' ? 'active' : ''}`}>3</span>
        <span id='general' className='clickable'>General Info</span>
    </div>
    <div className={`form-navigation-section ${currentForm === 'location' ? 'active' : ''}`}  onClick={handleCurrentForm}>
        <span className={`sr-number ${currentForm === 'location' ? 'active' : ''}`}>4</span>
        <span id='location' className='clickable'>Location Info</span>
    </div>
   </div>
    </>
}

export const FormComponent = ({ formFields,currentForm,setCurrentForm,setFormData,formData,setPropertyImage,propertyImage,ppdId,setUpdated,setIsLoading }) => {
    let navigate = useNavigate()
    const [formSection,setFormSection] = useState(formFields.basic)

    const formDetails = ['basic','details','general','location'];
    
    const [errSection,seterrSection] = useState("")


    useEffect(()=>{
        setFormSection(formFields[currentForm])
        return ()=>setFormSection(formFields.basic)
    },[currentForm])

    const handleCancel = ()=>{
        navigate("/",{replace:true})
    }

    const uploadImg = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
      
        try {
            let uploadUrl = "https://real-estate-21ik.onrender.com/upload";
            const response = await axios.post(uploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            let url= `https://real-estate-21ik.onrender.com/${response.data.url}`

            setFormData(data => ({
                ...data,
                imageUrl: url
            }));
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    

    const handleSubmit = (inputName,e) => {
        
        if (inputName==" ") {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                
                uploadImg(file);
            } else {
                alert('Please select an image file.');
            }
            return
        } else {
            setFormData(data => ({
                ...data,
                [currentForm]: {
                    ...data[currentForm],
                    [inputName]: e.target.value
                }
            }));
        }
    }


    const handleSave = ()=>{
   
        for (let index = 0; index < formDetails.length; index++) {
           
            if (currentForm==formDetails[index]) {
              if (index==formDetails.length-1) {
                console.log("post data")
              }else
              {

                setCurrentForm(formDetails[index+1])
              }
              break;
            }
            
        }
    }

    function populatePropertyListData(){
        let soldStatus = ['Sold','Unsold']
        let views = getRandomInt(100)
        let status = soldStatus[getRandomInt(2)]
        let daysLeft = getRandomInt(50)

        setFormData(data=>({
            ...data,
            views:views,
            status:status,
            daysLeft:daysLeft
        }))
    }

    function getRandomInt(MaxValue){
        return Math.floor(Math.random()*MaxValue)
    }
    const handleAddProperty = async ()=>{
        const validdata=()=>{
            try {
            const dataVerify=(key)=>{
               
                if (key=="imageUrl") {
                    
                    if (formData.imageUrl=="") {
                        return ["Please add image in General Info",false]
                    }
                    return ["",true]
                }

                let Selectedform=Object.keys(formData[key]);
               
                for (let index = 0; index < Selectedform.length; index++) {
                    
                    if(formData[key][Selectedform[index]]==""){
                        return ["In "+key  +" Info "+Selectedform[index]+" is empty",false]
 }
                }
                return [" ",true]


            }
            let arr=Object.keys(formData);
             for (let index = 0; index < arr.length; index++) {

           let [mess,res]  = dataVerify(arr[index]);
            if (res==false) {
                seterrSection(mess)
                setTimeout(()=>seterrSection(""),3000)
                return false
                
                
            } 
        }
        return true
        } catch (error) {
            console.log(error)
        }
        } 
      
           
       
        
       
       if (!validdata()) {
            return;
       } 
        let token = localStorage.getItem('token')
        //populate random values
        populatePropertyListData()

        if(ppdId){
            let editPropertyUrl = `https://real-estate-21ik.onrender.com/edit-property/${ppdId}`;
            let updatedProperty = await fetch(editPropertyUrl,{
                method:'PUT',
                headers:{
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(formData)
            })

            if(!updatedProperty.ok){
                alert("unable to create document",propertyAdded.statusText)
            }

            if(updatedProperty.ok){
                alert("successfully updated document")
                setUpdated(prev=>!prev)
                setIsLoading(true)
                navigate('/')
            }
            return
        }
        let addPropertyUrl = 'https://real-estate-21ik.onrender.com/add-property'
        let propertyAdded = await fetch(addPropertyUrl,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body:JSON.stringify(formData)
        })

        if(!propertyAdded.ok){
            alert("unable to create document",propertyAdded.statusText)
        }
        if(propertyAdded.ok){
            alert("successfully added document")
            setUpdated(prev=>!prev)
            setIsLoading(true)
            navigate("/");
        }
    }

    const getFormValue = (inputName) => {
        return formData[currentForm][inputName] || '';
    }
    
    
    return (
      <form className='form-section-container' >
        <div className='form-details'>
        {
           Object.keys(formSection).map((fieldKey) => {
            const field = formSection[fieldKey];
    
            // based on input type, it either retuns select or text input
            return ( 
        field.type === 'select' ?
        <>
        <div className='field-container-select'>
            <label>{field.name}</label>
                <select key={field.name} id={fieldKey} value={getFormValue(fieldKey)} name={field.name} onChange={(e)=>handleSubmit(fieldKey,e)}>
                {
                    field.options.map(option=>{
                        return <option key={option} >{option}</option>
                    })
                }
                </select>
        </div>
        </> 
         :( field.type === 'file')?<>
         <div key={fieldKey} className='field-container'>
             <label>{field.name}</label>
             <input name={field.name} id={fieldKey} key={field.name}  type={field.type} placeholder={field.placeholder}  onChange={(e)=>handleSubmit(fieldKey,e)}/>
         </div></>:
        <div key={fieldKey} className='field-container-add-property'>
            <label>{field.name}</label>
            <input name={field.name} id={fieldKey} value={getFormValue(fieldKey)} key={field.name} type={field.type} placeholder={field.placeholder}  onChange={(e)=>handleSubmit(fieldKey,e)}/>
        </div>
    );
}) 
        }
        </div>
        <div className={(errSection.trim()=="")?"hideerr":"displayerr"}>
            <p className='errdata'>{errSection}</p>
        </div>
        
        <div className='button-container'>
            <button className='cancel-button' onClick={handleCancel}>Cancel</button>
            {
              currentForm=='location'?<button className='save-button' onClick={handleAddProperty} type='button'>Add Property</button>:<button className='save-button' type='button' onClick={handleSave}>Save and Continue</button>
            }
        </div>
       </form>
    );
  };
  