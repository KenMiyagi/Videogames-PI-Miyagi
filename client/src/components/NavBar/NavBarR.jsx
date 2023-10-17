import React, { useEffect, useState } from 'react'
import style from "./NavBarR.module.css"
import img from "../../images/joystick_icon.png"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {logOut, newProfPic} from "../../redux/actions/userActions"
import {paginate} from "../../redux/actions/filterPaginateActions"

const NavBarR = () => {
    const user = useSelector((state)=>state.user)
    const [pic, setPic] = useState(user.profilePicture)
    const [openMenu, setOpenMenu] = useState(false)
    const dispatch = useDispatch()

    const logOutHandler = ()=>{
        dispatch(logOut())
        dispatch(paginate(1))
        setOpenMenu(false)
      }

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
  return (
    <nav className={style.containerNav}>
        <label for="check">
        <img onClick={()=>setOpenMenu(!openMenu)} src="https://cdn.discordapp.com/attachments/781222020770693152/1163340795387052072/image.png?ex=653f388b&is=652cc38b&hm=74b20567a50829083df339104ae5d8d1b93b416c6906f00f6b3fbd26b8b979b5&" className={style.checkbtn}/>
        </label>
      <a className={style.link}>
        <img src={img} alt="logo-img" className={style.logo}/>
        <label className={style.title}>Videogames</label>
      </a>
      <ul className={style.navIcons}>
        <li onClick={()=>setOpenMenu(false)} className={style.listItem}><Link to="/home"><label className={style.navLabel}>Home</label></Link></li>
        <li onClick={()=>setOpenMenu(false)} className={style.listItem}><Link to="/form"><label className={style.navLabel}>Create</label></Link></li>
        <li onClick={()=>setOpenMenu(false)} className={style.listItem}><Link to="/favs"><label className={style.navLabel}>Favorites</label></Link></li>
        <li className={style.user}>
          <p>{user.userName}</p>
          <img src={pic} alt="prof-pic" onError={()=>noPicture()} onClick={()=>newProfilePicuture()}/>
        </li>
        <li onClick={()=>logOutHandler()}><Link className={style.navLink} to="/login"><img className={style.icon} alt="home-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138335731643850863/image.png"></img></Link></li>
      </ul>
      <ul className={ openMenu ? style.open : style.menu}>
        <li onClick={()=>setOpenMenu(false)} className={style.listItem}><Link to="/home">Home</Link></li>
        <li onClick={()=>setOpenMenu(false)} className={style.listItem}><Link to="/form">Create</Link></li>
        <li onClick={()=>setOpenMenu(false)} className={style.listItem}><Link to="/favs">Favorites</Link></li>
        <li onClick={()=>logOutHandler()} className={style.listItem}><Link to="/login">Log Out</Link></li>
      </ul>
    </nav>
  )
}

export default NavBarR
