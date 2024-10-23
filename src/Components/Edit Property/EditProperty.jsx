import AddProperty from "../Add Property/AddProperty"
import { useParams } from "react-router-dom"
export function EditProperty({setUpdated,setIsLoading}){

    let {ppdId} = useParams()

    return <>
    <AddProperty ppdId={ppdId} setUpdated={setUpdated} setIsLoading={setIsLoading}/>
    </>
}