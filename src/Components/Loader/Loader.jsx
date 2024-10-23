import '../Loader/loader.css'
import { RotatingSquare } from "react-loader-spinner"

export function Loader(){
    return <>
    <div className="loader-container">
            <RotatingSquare visible={true} height={100} width={100} color="#4fa94d" ariaLabel="loading..." wrapperClass="square-loader" />
        </div>
    </>
}