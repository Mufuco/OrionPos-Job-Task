import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import PhoneDirectory from './pages/PhoneDirectory';

function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login />}/>
  <Route path='/phonedirectory' element={<PhoneDirectory />}/>
</Routes>
</BrowserRouter>

      </div>
      
  );
}

export default App;
