import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import style from "../style/Testeos.module.css"
import Card from '../components/Card/Card'
import { paginate2 } from '../redux/actions/filterPaginateActions'

const Testeos = () => {
    const dispatch = useDispatch()
    const pages = useSelector((state)=>state.pages)
    const videoGames = useSelector((state)=>state.videoGamesPaginate)
    const filterNotFound = useSelector((state)=>state.filterNotFound)

    const setPaginate = (x) =>{
        dispatch(paginate2(x))
    }

  return (
    <div>
        <div>
            <button onClick={()=> setPaginate("prev")}>prev</button>
            {
                pages.map((x) => (
                    <span
                      className="button"
                      key={x}
                      onClick={() => setPaginate(x)}
                    >
                      {x}
                    </span>
                  ))
            }
            <button onClick={()=> setPaginate("next")}>next</button>
        </div>

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
    </div>
  )
}

export default Testeos
