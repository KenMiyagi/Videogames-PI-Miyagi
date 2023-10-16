import React, { useState } from 'react'
import style from "./NavBarR.module.css"
import img from "../../images/joystick_icon.png"

const NavBarR = () => {

    const [openMenu, setOpenMenu] = useState(false)

  return (
    <nav className={style.containerNav}>
      <input type="checkbox" id="check"/>
        <label for="check">
        <img onClick={()=>setOpenMenu(!openMenu)} src="https://cdn.discordapp.com/attachments/781222020770693152/1163340795387052072/image.png?ex=653f388b&is=652cc38b&hm=74b20567a50829083df339104ae5d8d1b93b416c6906f00f6b3fbd26b8b979b5&" className={style.checkbtn}/>
        </label>
      <a className={style.link}>
        <img src={img} alt="logo-img" className={style.logo}/>
      </a>
      <ul className={ openMenu ? style.open : style.menu}>
        <li className={style.listItem}><a href="#">Cada cosa</a></li>
        <li className={style.listItem}><a href="#">Cada cosa</a></li>
        <li className={style.listItem}><a href="#">Cada cosa</a></li>
        <li className={style.listItem}><a href="#">Cada cosa</a></li>
      </ul>
    </nav>
  )
}

export default NavBarR
