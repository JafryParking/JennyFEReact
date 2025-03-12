import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router';
import './App.css';
import {Layout} from './components/Layout.jsx';
import {Home} from './pages/Home.jsx'
import {User} from './pages/User.jsx';
import {Park} from './pages/Park.jsx';
import {Login} from './pages/Login.jsx';

function App() {
const [appUser, setAppUser] =  useState({
  userID: 0, // Default value for an integer
  name: "", // Default value for a string
  licencePlate: null, // Use null if the licence plate is optional
});
  useEffect(() => {
    let persisted = sessionStorage.getItem("persistedUser");
    if(persisted) setAppUser(JSON.parse(persisted));
  }, []);

  return (
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home appUser={appUser}/>}/>
          <Route path="login" element= {<Login appUser={appUser} setAppUser={setAppUser} />} />
          <Route path="user/:id" element={<User />}/>
          <Route path="park" element={<Park />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
