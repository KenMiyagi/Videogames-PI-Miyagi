import React, { useState } from 'react'
import {NavLink} from "react-router-dom"
import style from "./Card.module.css"

const Card = (props) => {
  //createdInDb Se utilizará mas tarde para la lógica del delete del crud
  const { id, name, image, genres, /* createdInDb */ } = props
  const img = "https://media.wired.com/photos/62feb60bcea7c0581e825cb0/4:3/w_2131,h_1598,c_limit/Fate-of-Game-Preservation-Games-GettyImages-1170073827.jpg"
  const [imgError, setImgError] = useState(false)

  const onError = () =>{
    setImgError(true)
  }

  return (
    <div className={style.cardContainer}>
      <p className={style.name}>{name}</p>
      <NavLink to={`/details/${id}`} id={id}>
        <img className={style.image} src={ imgError ? img : image} onError={()=>onError()} alt="img"/>
      </NavLink>
      <div className={style.genres} >
      {genres?.map((x) => x.name).join(", ")}
      </div>
    </div>
    )
}

export default Card

