import React, { useEffect, useState } from 'react'
import { removeFav, addFav, updateFavs, getFavs} from "../redux/actions/userActions"
import { deleteVideoGame, getVideoGames} from '../redux/actions/videoGameActions'
import { useDispatch, useSelector } from 'react-redux'
import {useParams, useNavigate} from "react-router-dom"
import { getDetails, clearDetail } from '../redux/actions/detailActions'
import style from "../style/Details.module.css"

const Details = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const detail = useSelector((state)=>state.videoGameDetail)
  const favsId = useSelector((state)=>state.user.favorites)
  const user = useSelector((state)=>state.user)


  useEffect(()=>{
    favsId?.forEach((fav) => {
      if (fav === id) {
         setIsFav(true);
      }
   });
    dispatch(getDetails(id))
    dispatch(updateFavs(user.id, user.favorites))
    return ()=>dispatch(clearDetail())
  },[dispatch, favsId, id, user.favorites, user.id])

  function removeHTMLTags(inputString) {
    // Expresión regular para buscar etiquetas HTML
    const regex = /<[^>]*>/g;
    // Reemplazar las etiquetas por una cadena vacía
    return inputString.replace(regex, '');
  }
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const editVideoGameHandler = (event)=>{
    navigate("/update/"+id)
  }

  const deleteVideoGameHandler = (event)=>{
    event.preventDefault()
    dispatch(deleteVideoGame(id)).then(()=>{
      dispatch(getVideoGames())
    })
    dispatch(removeFav(id))
    dispatch(updateFavs(user.id, user.favorites))
    dispatch(getFavs(user.id))
    navigate(-1)
    /* setTimeout(()=>{
      dispatch(getVideoGames())
    },1500) */
  }
  //Favoritos

  const [isFav, setIsFav] = useState(false)

  const handleFavorite = ()=>{
    if(isFav){
      setIsFav(false)
      dispatch(removeFav(id))
    }else{
      if(user.favorites.length<5){
        setIsFav(true);
        dispatch(addFav(id))
      }else{alert("You have reached the maximum number of favorites. Get premium to get unlimited favorites")}
    }
    dispatch(updateFavs(user.id, user.favorites))
  }
  const img = "https://media.wired.com/photos/62feb60bcea7c0581e825cb0/4:3/w_2131,h_1598,c_limit/Fate-of-Game-Preservation-Games-GettyImages-1170073827.jpg"
  const [imgError, setImgError] = useState(false)

  const onError = () =>{
    setImgError(true)
  }

  return (
      <div className={style.detailsContainer}>
        <div className={style.divButton}>
          <button className={style.btn} onClick={goBack}>↩</button>
          {detail.createdInDb 
          ? ( <div className={style.crud}>
            <img className={style.iconEdit} alt="edit.icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138704390925066251/image.png" onClick={editVideoGameHandler}/>
            <img className={style.iconDelete} alt="delete-icon" src="https://cdn.discordapp.com/attachments/781222020770693152/1138704388546891837/image.png" onClick={(e)=>deleteVideoGameHandler(e)}/>
            {isFav 
            ? <img className={style.iconFav} alt="onFav-icon" onClick={handleFavorite} src="https://cdn.discordapp.com/attachments/1104235122636619887/1141036533126795324/image.png"/>
            : <img className={style.iconFav} alt="offFav-icon" onClick={handleFavorite} src="https://cdn.discordapp.com/attachments/1104235122636619887/1141036565443915867/image.png"/>}</div>)
          : (<>{isFav 
            ? <img className={style.iconFav} alt="onFav-icon" onClick={handleFavorite} src="https://cdn.discordapp.com/attachments/1104235122636619887/1141036533126795324/image.png"/>
            : <img className={style.iconFav} alt="offFav-icon" onClick={handleFavorite} src="https://cdn.discordapp.com/attachments/1104235122636619887/1141036565443915867/image.png"/>}</>) }
        </div>
            {detail?.image ? (<div className={style.spec} >
              <div style={{width:"430px"}} className={style.descDiv}>
                <p className={style.desc}>{detail.createdInDb===true ? detail.description : removeHTMLTags(detail.description)}</p>
                <div className={style.genresPlats}>
                  <p className={style.genPlatTitle}>Genres:</p>
                  <p className={style.genresPlats}>{detail?.genres?.map((x) => x.name).join(", ")}</p>
                </div>
              </div>
                <div style={{width:"430px"}} className={style.imgSpec}>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3 style={{margin: "0px", padding: "0px"}}>Released: {detail?.released}</h3>
                    <h3 style={{margin: "0px", padding: "0px"}}>Rating: {detail?.rating}</h3>
                  </div>
                  <img className={style.img} src={imgError ? img : detail?.image} onError={()=>onError()} alt={detail?.name} />
                  <div className={style.genresPlats}>
                    <p className={style.genPlatTitle} >Platforms:</p>
                    <p>{detail?.platforms?.join(", ")}</p>
                  </div>
                </div>
            </div>) : <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" className={style.notLoadedGif}/>}
        </div>
  )
}

export default Details
