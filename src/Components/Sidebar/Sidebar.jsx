import './sidebar.css';
import home from '../../assets/home.svg';
import notification from '../../assets/notification.svg';
import receive from '../../assets/receive.svg';
import sent from '../../assets//sent.svg';
import visibility from '../../assets//visibility.svg';
import se from '../../assets//se.svg';
export default function Sidebar(){
    return (
        <div className="sidebar">
            <div style={{height: '128px'}}>
                <span className="logo">Logo</span>
            </div>
            <div>
                <a href="#" className="button" style={{color: '#2289FF'}}>
                    <img className="svg-icon" src={home} alt="SVG Icon" />
                    <span className="button-name">Property</span> 
                </a>
            </div>
            <div>
                <a href="#" className="button">
                    <img className="svg-icon" src={notification} alt="SVG Icon" />
                    <span className="button-name">Assistance</span> 
                </a>
            </div>
            <div>
                <a href="#" className="button">
                    <img className="svg-icon" src={receive} alt="SVG Icon" />
                    <span className="button-name">Received Interest</span> 
                </a>
            </div>
            <div>
                <a href="#" className="button">
                    <img className="svg-icon" src={sent} alt="SVG Icon" />
                    <span className="button-name">Sent Interest</span> 
                </a>
            </div>
            <div>
                <a href="#" className="button">
                    <img className="svg-icon" src={visibility} alt="SVG Icon" />
                    <span className="button-name">Property Views</span> 
                </a>
            </div>
            <div>
                <a href="#" className="button">
                    <img className="svg-icon" src={se} alt="SVG Icon" />
                    <span className="button-name">Tariff Plan</span> 
                </a>
            </div>
        </div>
    );
}