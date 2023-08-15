import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addFilter, genresFilter, getGenres} from "../../redux/actions"
import style from "./Genres.module.css"

const Genres = () => {
  const genres = useSelector(state=>state.genres)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getGenres())
  },[dispatch])

  const handleGenres = (event)=>{
    event.preventDefault()
    if(event.target.value !== "Generos"){
      dispatch(addFilter({type: "genres", filterArgument:event.target.value}))
    }

    dispatch(genresFilter(event.target.value))
  }

  return (
    <div className={style.genresContainer}>
      <label className={style.labelTitle}>Ordenar por creación</label>
      <select value="Generos" className={style.select} onChange={(event) => handleGenres(event)}>
        <option>Generos</option>
        {
          genres.map((x, i)=>{
            return <option key={i} value={x.name}>{x.name}</option>
          })
        }
      </select>
    </div>
  )
}

export default Genres
