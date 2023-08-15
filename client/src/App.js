import './App.css';
import './App.css';
import React from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Home from "./views/Home"
import Form from "./views/Form"
import Landing from "./views/Landing"
import Details from "./views/Details"
import NavBar from "./components/NavBar/NavBar"
import Update from "./views/Update"
import About from "./views/About"
import Favs from "./views/Favs"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


function App() {
  const {pathname} = useLocation()
  const navigate = useNavigate()
  const access = useSelector((state)=>state.access)

  useEffect(()=>{
    if(pathname !== "/" || pathname !== "signup" || pathname !== ""){
      (pathname !== "/" && !access )&& navigate("/login");
    }
    access && navigate("/home")
},[access])

  return (
    <div className="App">
      {!(pathname==="/" || pathname==="/login" || pathname==="/signup") && <NavBar path="/:"/>}
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/update/:id" element={<Update/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/favs" element={<Favs/>} />
      </Routes>
    </div>
  );
}

export default App;
