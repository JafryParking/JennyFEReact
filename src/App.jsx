import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router';
import './App.css';
import {Layout} from './components/Layout.jsx';
// import {Home} from './pages/Home.jsx'
import {User} from './pages/User.jsx'

function App() {
  

  return (
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* <Route path="/" element={<Home />}/> */}
          <Route path="/" element={<User />}/>
          {/* <Route path="park" element={<Park />}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
