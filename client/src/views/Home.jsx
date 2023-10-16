import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"

import { removeFilter,allFilters, paginate } from '../redux/actions/filterPaginateActions'
import { getVideoGames, notReloadAction } from '../redux/actions/videoGameActions'

import style from "../style/Home.module.css"
import Card from "../components/Card/Card"
import Paginate from "../components/Paginate/Paginate"
import Dashboard from '../components/Dashboard/Dashboard.jsx'
import FilterRenderSubmit from '../components/FIlterRenderSubmit/FilterRenderSubmit'

const Home = () => {
  const videoGames = useSelector((state) => state.videoGamesPaginate)
  const dispatch = useDispatch()
  const filterNotFound = useSelector((state)=>state.filterNotFound)
  const notReload = useSelector((state)=> state.notReload) 


  useEffect(()=>{
    if(!notReload){
      dispatch(getVideoGames())
      dispatch(notReloadAction(true))
    }
  },[])

  return (
    <div className={style.allHome}>
      <div className={style.allComponents}>
        <Dashboard/>
        <FilterRenderSubmit/>
      </div>
      <Paginate/>
      <div className={style.homeCointainer}>
      {
        videoGames.length >0 ? (videoGames.map(({ id, name, image, description, released, rating, platforms, genres, createdInDb }) => {
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
        })): (filterNotFound ?(<img src="https://i.imgur.com/0XC49UU.png" className={style.notLoadedImage}/>):(<img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" className={style.notLoadedGif}/>) )
      }
      </div>
    </div>
  )
}

export default Home
