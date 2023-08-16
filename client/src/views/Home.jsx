import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"

import { removeFilter,allFilters, paginate2 } from '../redux/actions/filterPaginateActions'
import { getVideoGames, notReloadAction } from '../redux/actions/videoGameActions'

import style from "../style/Home.module.css"
import Card from "../components/Card/Card"
import Paginate from "../components/Paginate/Paginate"
import Filters from "../components/Filters/Filters"
import SearchBar from "../components/SearchBar/SearchBar"

const Home = () => {
  const videoGames = useSelector((state) => state.videoGamesPaginate)
  const arrayFilterArguments = useSelector((state)=>state.arrayFilterArguments)
  const dispatch = useDispatch()
  const filterNotFound = useSelector((state)=>state.filterNotFound)
  const notReload = useSelector((state)=> state.notReload) 


  useEffect(()=>{
    if(!notReload){
      dispatch(getVideoGames())
      dispatch(notReloadAction(true))
    }
  },[])

  const reloadVG = ()=>{
    dispatch(getVideoGames())
    dispatch(paginate2(1))
  }

  const deleteFilter =(event)=>{
    dispatch(removeFilter(event.target.value))
  }

  const submitFilter= ()=>{
    dispatch(allFilters())
  }

  return (
    <div className={style.allHome}>
      <div className={style.allComponents}>
          <div className={style.components}>
            <img onClick={()=>reloadVG()} className={style.icon} src="https://cdn.discordapp.com/attachments/781222020770693152/1138697413561942076/image.png" alt="Reload"/>
            <SearchBar className={style.searchBar} />
            <Filters/>
          </div>
          <div className={style.filtersRender}>
            <h2 className={style.filtersRenderTitle}>Selected Filters/Sorts: </h2>
            <div className={style.filtersDiv}>
            {arrayFilterArguments.map((obj) => {
                return <div className={style.filterDivRender}  key={obj.filterArgument}> <p className={style.filterName}>{obj.filterArgument}</p>   
                <button className={style.filterCloseButton}  value={obj.filterArgument} onClick={(event) => deleteFilter(event)}> X </button>
                </div> 
                })}
            </div>
                <button className={style.searchButton} onClick={()=>submitFilter()}>Filter</button>
          </div>
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
        })): (filterNotFound ?(<p className={style.notLoaded}>SIN COINCIDENCIAS EN EL FILTRO PA</p>):(<p className={style.notLoaded}>LOADING...</p>) )
      }
      </div>
      <Paginate/>
    </div>
  )
}

export default Home
