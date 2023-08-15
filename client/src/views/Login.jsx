
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, login, clearFavs} from "../redux/actions/userActions" 
import {clearErrors} from "../redux/actions/errorActions"
import {NavLink} from 'react-router-dom';
import loginValidation from '../validation/loginValidation';
import style from '../style/Login.module.css';

const Login = () => {
  const dispatch = useDispatch();
  const access = useSelector((state)=>state.access)
  const globalErrors = useSelector((state)=>state.errors)
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  useEffect(()=>{
    dispatch(logOut())
   dispatch(clearFavs())
   dispatch(clearErrors())
  },[dispatch])


  const handleChange=(event)=>{
    setUserData({
        ...userData,
        [event.target.name]:event.target.value
    })

    setErrors(loginValidation({
        ...userData,
        [event.target.name]:event.target.value
    }))
}
    const  handleSubmit=(event)=>{
        event.preventDefault()
        dispatch(login(userData))
        if(access){setUserData({
          email: '',
          password: '',
        })}
        dispatch(clearErrors())
    }

    let isSubmitDisabled = Object.keys(errors).length > 0;

  return (
    <div className={style.loginContainer}>
      <form className={style.form}>
        <h1 className={style.titulo}>Log in!</h1>
        <div className={style.formDivs}>
          <input
            className={style.inputs}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter an email"
            value={userData.email}/>
          <p className={style.errors} style={{visibility: errors.email ? "visible" : "hidden"}}>{errors.email}</p>
        </div>
        <div className={style.formDivs}>
          <input
            className={style.inputs}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Enter your password"
            value={userData.password}/>
          <p className={style.errors} style={{visibility: errors.password ? "visible" : "hidden"}}>{errors.password}</p>
        </div>

        <div className={style.formDivs}>
        <button className={style.submitButton} disabled={isSubmitDisabled} style={isSubmitDisabled ? {opacity: "0.6", cursor: "not-allowed"}:null} type="submit" value="Submit" onClick={(event)=>handleSubmit(event)}>Get into</button>
          <p className={style.loginError} style={{visibility: globalErrors.LOGIN ? "visible" : "hidden"}}>{globalErrors.LOGIN?.error}</p>
          <div className={style.signUpDiv} ><p>Don't you have an account? </p><NavLink style={{textDecoration: "none"}} to="/signup"><p className={style.createOneHere} > Create one here!</p></NavLink></div>
        </div>
      </form>
      <div style={{display:"flex", width:"100%"}}>
            <NavLink className={style.navLink} to="/">
              <img
              style={{ width: '20px'}}
              alt="lading-icon"
              src="https://cdn.discordapp.com/attachments/1104235122636619887/1139754480720695438/image.png"
              />
            </NavLink> 
          </div>
    </div>
  );
};

export default Login;