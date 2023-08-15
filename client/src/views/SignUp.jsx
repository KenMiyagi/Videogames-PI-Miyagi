import React, { useEffect } from 'react'
import {useState} from "react"
import style from "../style/SignUp.module.css"
import { useDispatch, useSelector } from 'react-redux'
import {signUp, login, clearErrors} from "../redux/actions"
import { useNavigate, Link, NavLink} from 'react-router-dom'
import signUpValidation from "../validation/signUpValidation"

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const globalErrors = useSelector((state)=>state.errors)
    const [errors, setErrors] = useState({a:""})
    const [userData, setUserData] = useState({
        email:"",
        userName:"",
        password1:"",
        password2:""
    })

    function handleChange(event){
        setUserData({
            ...userData,
            [event.target.name]:event.target.value
        })

        setErrors(signUpValidation({
            ...userData,
            [event.target.name]:event.target.value
        }))
    }
    function handleSubmit(event){
        event.preventDefault()
        dispatch(signUp({
            email:userData.email,
            userName:userData.userName,
            password:userData.password2
        }))
        if((globalErrors?.SIGN_UP)){
            setTimeout(()=>{
                setUserData({
                    email:"",
                    userName:"",
                    password1:"",
                    password2:""
                })
                dispatch(login({
                    email:userData.email,
                    password: userData.password2
                }))
                dispatch(clearErrors())
            },1000)
        }
    }

    let isSubmitDisabled = Object.keys(errors).length > 0;

    return(
        <div className={style.signUpContainer}>
            {console.log(userData)}
            <form className={style.form} autoComplete='off'>
                <h1 className={style.titulo}>Sign up!</h1>
                <div className={style.formDivs}>
                    <input
                        className={style.inputs}
                        onChange={handleChange} 
                        name="email" 
                        placeholder="Enter an email"
                        autoComplete="nope"
                        type="sad"
                        value={userData.email}>
                    </input>
                    <p className={style.errors} style={{ visibility: errors.email ? 'visible' : 'hidden' }}>{errors.email}</p>
                </div>
                <div className={style.formDivs}>
                    <input
                        className={style.inputs}
                        onChange={handleChange} 
                        name="userName" 
                        placeholder="Enter a Username"
                        autoComplete="off"
                        type="sad"
                        value={userData.userName}>
                    </input>
                    <p className={style.errors} style={{ visibility: errors.userName ? 'visible' : 'hidden' }}>{errors.userName}</p>
                </div>
                <div className={style.formDivs}>
                    <input
                        autoComplete="nope"
                        className={style.inputs}
                        onChange={handleChange} 
                        name="password1" type="password" 
                        placeholder="Enter your password"
                        value={userData.password1}>
                    </input>
                    <p className={style.errors} style={{ visibility: errors.password1 ? 'visible' : 'hidden' }}>{errors.password1}</p>
                </div>
                <div className={style.formDivs}>
                    <input
                        className={style.inputs}
                        onChange={handleChange} 
                        name="password2" type="password" 
                        placeholder="Enter your password again"
                        autoComplete="nope"
                        value={userData.password2}>
                    </input>
                    <p className={style.errors} style={{ visibility: errors.password2 ? 'visible' : 'hidden' }}>{errors.password2}</p>
                </div>

                <div className={style.formDivs}>
                <button className={style.submitButton} disabled={isSubmitDisabled} style={isSubmitDisabled ? {opacity: "0.6", cursor: "not-allowed"}:null} type="submit" value="Submit" onClick={(event)=>handleSubmit(event)}>Register</button>
                    <p className={style.signUpErrors} style={{visibility: globalErrors.SIGN_UP ? "visible" : "hidden"}}>{globalErrors.SIGN_UP?.error}</p>
                    <div className={style.loginDiv} ><p>i've already have an account! </p><NavLink style={{textDecoration: "none"}} to="/login"><p className={style.login} > Log in!</p></NavLink></div>
                </div>
            </form>
        </div>
    )
}
export default SignUp

