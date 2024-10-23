import './App.css'
import Base from './Components/Base/Base.jsx';
import { createContext, useState } from 'react';

export const authContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') != null);
  return <>
    <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Base />
    </authContext.Provider>
  </>
}
export default App
