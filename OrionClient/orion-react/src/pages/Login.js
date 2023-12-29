import React from 'react';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../components/LoginForm'
import LoginHeader from '../components/LoginHeader'

function Login() {
  return (
    <div className="App container">
      <div className='HeaderDiv'>
      <LoginHeader/>
      </div>
     <div className='FormDiv'>
     <LoginForm />
     </div>
    </div>
  );
}

export default Login;