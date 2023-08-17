import React, { useState } from 'react'
import {Link, useLocation} from "react-router-dom"
import style from "./NavBar.module.css"
import img from "../../images/joystick_icon.png"
import { useDispatch, useSelector } from 'react-redux'
import {logOut, newProfPic} from "../../redux/actions/userActions"
import {paginate} from "../../redux/actions/filterPaginateActions"
const NavBar = () => {

  const user = useSelector((state)=>state.user)
  const details = useSelector((state)=>state.videoGameDetail)
  const dispatch = useDispatch()
  const {pathname} = useLocation()

  const [pic, setPic] = useState(user.profilePicture)

  const noPicture=()=>{
    setPic("https://cdn.discordapp.com/attachments/781222020770693152/1140041535203848364/image.png")
  }
  const newProfilePicuture=()=>{
    const newProfilePicture = prompt("Enter your new profile picture");
    if(newProfilePicture){
      dispatch(newProfPic(user.id, newProfilePicture))
      setPic(newProfilePicture)
    }
  }
  var title = ""
  if(pathname === "/home"){
     title = "Videojuegos"
  }else if(pathname === "/form"){
     title = "Add a new Videogame!"
  }else if (pathname === "/about"){
     title = "About me!"
  }else if(pathname.includes("/update")){
     title = "Editing..."
  }else if(pathname === "/favs"){
     title = "My favorites <3" 
  }else if( pathname.includes("details")){
     title = details.name
  }

  const logOutHandler = ()=>{
    dispatch(logOut())
    dispatch(paginate(1))
  }

  return (
    <div className={style.navContainer}>
      <div className={style.navContent}>
        <div className={style.navLogo}>
            <img className={style.navImage} src={img} alt="miss-img"></img>
        </div>
        <div className={style.links} >
          <Link className={style.navLink} to="/home"><img className={style.icon} alt="home-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138333568762921021/image.png"></img></Link>
          <Link className={style.navLink} to="/form"><img className={style.icon} alt="home-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138336789808025610/image.png"></img></Link>
          <Link className={style.navLink} to="/favs"><img className={style.icon} alt="home-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138697610815881226/image.png"></img></Link>
          <Link className={style.navLink} to="/about"><img className={style.icon} alt="home-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138336314228482098/image.png"></img></Link>
          <Link className={style.navLink} to="/test"><img className={style.icon} alt="home-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138336314228482098/image.png"></img></Link>
        </div>
      </div>
      <h1 className={style.title}>{title}</h1>
      <div className={style.logOut}>
      <div className={style.user} >
        <p>{user.userName}</p>
        <img src={pic} alt="prof-pic" onError={()=>noPicture()} onClick={()=>newProfilePicuture()}/>
      </div>
      <Link className={style.navLink} to="/login"><img onClick={()=>logOutHandler()} className={style.icon} alt="home-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138335731643850863/image.png"></img></Link>
      </div>
    </div>
  )
}

export default NavBar


/*   return (
    <div className={style.navContainer}>
      <div className={style.navContent}>
        <div className={style.navLogo}>
            <img className={style.navImage} src="" alt="miss-img"></img>
        </div>
        <div className={style.links} >
          <Link className={style.navLink} to="/home">Home</Link>
          <Link className={style.navLink} to="/form">Form</Link>
          <Link className={style.navLink} to="/">Landing</Link>
        </div>
      </div>
    </div>
  ) */
