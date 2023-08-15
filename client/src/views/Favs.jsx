import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from "../components/Card/Card"
import style from "../style/Favs.module.css"
import {getFavs, clearFavs} from "../redux/actions"

const Favs = () => {

  const userId = useSelector((state)=>state.user.id)
  const favs = useSelector((state)=>state.favs)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getFavs(userId))
  },[])

  return (
    <div className={style.allHome}>
      <div className={style.homeCointainer}>
      {
        favs ? (favs.map(({ id, name, image, description, released, rating, platforms, genres, createdInDb }) => {
          return (
            <div key={id} className={style.cardHomeContainer}>
              <Card
                id={id}
                name={name}
                image={image}
                description={description}
                released={released}
                rating={rating}
                platforms={platforms}
                genres={genres}
                createdInDb={createdInDb}
              />
            </div>
          );
        })): <div>No tienes favoritos!</div>
      }
      </div>
    </div>
  )
}

export default Favs
