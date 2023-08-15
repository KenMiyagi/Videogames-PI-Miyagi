import React from 'react'
import {Link} from "react-router-dom"
import style from "../style/Landing.module.css"

const Landing = () => {
  return (
    <div className={style.landingContainer}>
      <h1 className={style.title}>VideoGames Library</h1>
      <Link className={style.link} to="/login">Log in</Link>
    </div>
  )
}

export default Landing
