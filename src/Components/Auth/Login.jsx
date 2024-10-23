import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { authContext } from '../../App';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(authContext);
  const [isLoading,setIsLoading] = useState(false)

  const handleToken = (token) => {
    
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //change url for different endpoint
    const url ="https://real-estate-21ik.onrender.com/login";

    const user = { email, password };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(user),
    });

    // {status:success,token:284kjfdjfksjksdk}
    const responseData = await response.json();
    if (responseData.status=="failed") {
      alert(responseData.message);
    }else{   if (responseData.status=="success") {
      const token = responseData.token;
      handleToken(token);
      navigate('/');
      setIsLoading(false);
    }
    if (!responseData.status) {
      alert(responseData.message);
    }  }

    
  };

  return (
    <div className='authcon'>
    <div className="login-main-container">
      <h1>Logo</h1>
      <p>Enter your credentials to access your account</p>
      <div className="login-container">
        <form method="post">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="mailid"
            id="mailid"
            placeholder="User ID"
            required={true}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required={true}
          />
          <button className={`signup-btn ${isLoading?"button-clicked":""}`} onClick={handleLogin} disabled={isLoading}>
            Sign In
          </button>
        </form>
        <Link className="register-link" to="/register">
          Sign Up
        </Link>
      </div>
    </div></div>
  );
};

export default Login;
