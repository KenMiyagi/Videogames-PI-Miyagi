import React from 'react'
import {NavLink} from "react-router-dom"
import style from "./Card.module.css"

const Card = (props) => {
  //createdInDb Se utilizará mas tarde para la lógica del delete del crud
  const { id, name, image, genres, /* createdInDb */ } = props

  return (
    <div className={style.cardContainer}>
      <p className={style.name}>{name}</p>
      <NavLink to={`/details/${id}`} id={id}>
        <img className={style.image} src={image} alt="img"/>
      </NavLink>
      <div className={style.genres} >
      {genres?.map((x) => x.name).join(", ")}
      </div>
    </div>
    )
}

export default Card

