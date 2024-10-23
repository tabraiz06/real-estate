import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [username, setUserName] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfPassword, setCnfPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleValidation = (input) => {
    if (input.username === '') {
      alert('Username cannot be empty!');
      return false;
    }
    if (input.email === '') {
      alert('Email cannot be empty!');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(input.email)) {
      alert('Email is Invalid!');
      return false;
    }
    if (input.password === '') {
      alert('Password cannot be empty!');
      return false;
    }
    // add validation for password
    if (input.password !== input.cnfPassword) {
      alert('Password does not match');
      return false;
    }
    return true;
  };

  const registerUser = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    const input = { username, email, password, cnfPassword };
    
    if (!handleValidation(input)) {
      setIsLoading(false)
      return;
    }

    delete input.cnfPassword;
    const url = "https://real-estate-21ik.onrender.com/register"; //change end point of api

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(input),
    });
    const responseData = await response.json();
    if (!responseData.status) {
      alert(responseData.message);
    } else {
      if (responseData.status=="failed") {
        alert(responseData.message);
        navigate('/register');
      } else {
        alert("account created successfully for user with email : " +responseData.data.email);
        navigate('/login');
      }
     
    }
    setIsLoading(false)
  };
  return (
    <div className='authcon'>
    <div className="login-main-container">
      <h1>Logo</h1>
      <p>Create new account</p>
      <div className="login-container">
        <form method="post">
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="Enter Username"
            required={true}
          />
          <input
            onChange={(e) => setemail(e.target.value)}
            type="email"
            name="mailid"
            id="mailid"
            placeholder="Email id"
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
          <input
            onChange={(e) => setCnfPassword(e.target.value)}
            type="password"
            name="password"
            id="cnfpassword"
            placeholder="Confirm Password"
            required={true}
          />

          <button className={`signup-btn ${isLoading?"button-clicked":""}`} onClick={registerUser} disabled={isLoading}>
            Sign Up
          </button>
        </form>
        <Link className="signup-link" to="/login">
          Sign In
        </Link>
      </div>
    </div></div>
  );
};

export default Register;
