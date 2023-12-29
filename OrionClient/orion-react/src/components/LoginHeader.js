import React from 'react';
import './LoginHeader.css'; // Tell webpack that Button.js uses these styles

function LoginHeader() {
  return (
    <div className="LoginHeader">
     
     <h2 className='Header'>
                <span className='headerSpan'>ORIONPOS</span>
                <span className='insideSpan headerSpan'> TELEFON</span>
                <span className='insideSpan headerSpan'> REHBERİ</span>
      </h2>
    </div>
  );
}

export default LoginHeader;