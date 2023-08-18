import style from "../style/Update.module.css"
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getVideoGames, patchVideoGame, getGenres} from "../redux/actions/videoGameActions"
import { setNewErrors, clearErrors} from '../redux/actions/errorActions'
import { getDetails } from '../redux/actions/detailActions'
import {formValidation} from "../validation/formValidation"

const Update = () => {

  const dispatch = useDispatch()
  const genres = useSelector((state)=>state.genres)
  const navigate = useNavigate()
  const detail = useSelector((state)=>state.videoGameDetail)
  const globalErrors = useSelector((state)=>state.errors)
  const {id} = useParams()

  const genresDetail = detail?.genres?.map(x=>x.name)
  const platformsDetail = detail?.platforms

  const [input, setInput] = useState({
    name:detail.name,
    image:detail.image,
    released:detail.released,
    description:detail.description,
    rating:detail.rating,
    platforms:platformsDetail,
    genres:genresDetail,
  })

  useEffect(()=>{
    dispatch(getDetails(id))
    dispatch(getGenres())
    validateInput({...input, platforms: [...input.platforms, platformsDetail]})
    validateInput({...input, genres: [...input.platforms, genresDetail]})
    return ()=>dispatch(clearErrors())
  },[ dispatch])

  const [errors, setErrors] = useState({a:""})
  
  const handleChange = (event)=>{

    const val =  event.target.name==="rating" ?  Number(event.target.value) : event.target.value
    setInput({
      ...input,
      [event.target.name]:val
    })
    setErrors(formValidation({
      ...input,
      [event.target.name]:val
    }))
  }

  const cancelButton = ()=>{
    navigate(-1)
    dispatch(clearErrors())
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(Object.keys(errors)?.length===0){
      dispatch(patchVideoGame(input, id)).then((patchError) =>{
          if((!patchError)){
            setInput({
              name:"",
              image:"",
              released:"",
              description:"",
              rating:0,
              platforms:[],
              genres:[]
            })
            dispatch(getVideoGames())
            dispatch(clearErrors())
            navigate("/home")
          }else{
            dispatch(setNewErrors({type:"PATCH_VIDEOGAME",error:patchError.response.data}))
          }
      })
    }
  }

//---------------------PLATFORMS---------------------
  const handlePlatforms = (event)=>{
    event.preventDefault();
    const rep = input.platforms.find(platform => platform === event.target.value)
    if(event.target.value !== "default" && !rep){//Si el valor no es la primer option y no está repetido cambio el estado
      setInput({
        ...input, platforms: [...input.platforms, event.target.value]
      })
      event.target.value="default"
      validateInput({...input, platforms: [...input.platforms, event.target.value]})
    }event.target.value="default"
  }
  const handleDeletePlat = (event)=>{
    const deleted = input.platforms.filter(platform => platform !== event.target.value)
    setInput({
      ...input,
      platforms: deleted
    })
    validateInput({...input,platforms: deleted})
  }
//---------------------PLATFORMS---------------------
//---------------------VALIDATION---------------------
const validateInput = (inputData) =>{
  const errors = formValidation(inputData)
  setErrors(errors)
}
//---------------------VALIDATION---------------------
//---------------------GENRES---------------------
  const handleGenre = (event)=>{
    event.preventDefault();
    const rep = input.genres.find(genre => genre=== event.target.value)
    if(event.target.value !== "default" && !rep){//Si el valor no es la primer option y no está repetido cambio el estado
      setInput({
        ...input, genres: [...input.genres, event.target.value]
      })
      event.target.value= "default"
      validateInput({...input, genres:[...input.genres, event.target.value]})
    }event.target.value= "default"
  }

  const handleDeleteGen = (event)=>{
    const deleted = input.genres.filter(genre => genre !== event.target.value)
    setInput({
      ...input,
      genres: deleted
    })
    validateInput({...input, genres: deleted})
  }
//---------------------GENRES---------------------
const isSubmitDisabled = Object.keys(errors).length > 0;

const [imgError,setImgError] = useState(true)
const img = "https://media.wired.com/photos/62feb60bcea7c0581e825cb0/4:3/w_2131,h_1598,c_limit/Fate-of-Game-Preservation-Games-GettyImages-1170073827.jpg"
const handleImageError = () =>{
  setImgError(true)
}
const handleImageLoad = () =>{
  setImgError(false)
}
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
            <p className={style.errors} style={{visibility: errors.name ? "visible" : "hidden"}}>{errors.name}</p>
            <label className={style.labels} >Name of the video game:</label>
            <input value={input.name} className={style.inputs} autoComplete="off" onChange={handleChange} type="text" name="name"/>
          </div>

          <div className={style.inputContainer}>
            <label className={style.labels}>Image as a link:</label>
            <input value={input.image}  className={style.inputs} autoComplete="off" onChange={handleChange} type="text" name="image"/>
          </div>

          <div className={style.inputContainer}>
            <p className={style.errors} style={{visibility: errors.released ? "visible" : "hidden"}}>{errors.released}</p>
            <label className={style.labels}>Released:</label>
            <input value={input.released}  className={style.dateInput} autoComplete="off" onChange={handleChange} type="date" name="released"/>
          </div>

          <div className={style.inputContainer}>
            <p className={style.errors} style={{visibility: errors.description ? "visible" : "hidden"}}>{errors.description}</p>
            <label className={style.labels}>Description:</label>
            <textarea value={input.description}  className={style.inputs}  autoComplete="off" onChange={handleChange} type="text" name="description"/>
          </div>

          <div className={style.ratPlatGen}>
            <div className={style.inputContainer}>
              <label className={style.labels}>Rating:</label>
              <input value={input.rating}  className={style.ratingInput} onChange={handleChange} type="number" name="rating" onkeydown="return event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 8 || event.keyCode === 46" min={1} max={5}/>
              <p className={style.errors} style={{visibility: errors.rating ? "visible" : "hidden"}}>{errors.rating}</p>
            </div>

            <div className={style.inputContainer}>
              <label className={style.labels}>Platforms:</label>
                <select className={style.formSelect} id="platform" onClick={(event)=>handlePlatforms(event)}>
                  <option value={"default"}>Plataforma</option>
                  <option value={"Microsoft Windows"}>Microsoft Windows</option>
                  <option value={"Linux"}>Linux</option>
                  <option value={"macOS"}>macOS</option>
                  <option value={"PlayStation 5"}>PlayStation 5</option>
                  <option value={"PlayStation 4"}>PlayStation 4</option>
                  <option value={"PlayStation 3"}>PlayStation 3</option>
                  <option value={"PlayStation 2"}>PlayStation 2</option>
                  <option value={"Xbox 360"}>Xbox 360</option>
                  <option value={"Xbox Series S/X"}>Xbox Series S/X</option>
                  <option value={"Xbox One"}>Xbox One</option>
                  <option value={"Nintendo Switch"}>Nintendo Switch</option>
                  <option value={"Android"}>Android</option>
                  <option value={"iOS"}>iOS</option>
                  <option value={"SteamOS"}>SteamOS</option>
                </select>
                <p className={style.selectErrors} style={{visibility: errors.platforms ? "visible" : "hidden"}}>{errors.platforms}</p>
            </div>

            <div className={style.inputContainer}>
              <label className={style.labels}>Generos:</label>
              <select className={style.formSelect} onClick={(event)=>handleGenre(event)}>
                <option value="default">Generos</option>
                {
                  genres.map((x,i)=>{
                    return <option key={i} value={x.name}>{x.name}</option>
                  })
                }
              </select>
              <p className={style.selectErrors} style={{visibility: errors.genres ? "visible" : "hidden"}}>{errors.genres}</p>
            </div>
          </div>
        </form>
        <div className={style.selected}>
          <div className={style.imageRender}>
            <h3>Image preview:  </h3>
            <img className={style.imagePreview} src={imgError ? img : input.image} alt={input.image?.length>0 ? "Not found" : ""} />
            <div style={{display: "flex", justifyContent:"space-between"}} >
              <input className={style.submit} type="submit" value="Cancel" onClick={()=>cancelButton()}/>
              <input className={style.submit} disabled={isSubmitDisabled} style={isSubmitDisabled ? {opacity: "0.6", cursor: "not-allowed"}:null} type="submit" value="Submit" onClick={(event)=>handleSubmit(event)}/>
            </div>
            <p className={style.loginError} style={{visibility: globalErrors?.PATCH_VIDEOGAME ? "visible" : "hidden"}}>{globalErrors?.PATCH_VIDEOGAME?.error}</p>
          </div>
          <div className={style.selectGenPlat}>
            <h3>Selected platforms: </h3>
            <div className={style.toCloseDiv}>
            {input?.platforms?.map((plat)=>{
                          return <div className={style.toClose} key={plat}> <p className={style.pClose}>{plat}</p> 
                          <button className={style.closeButton} value={plat} onClick={(e) => handleDeletePlat(e)}> X </button> 
                          </div>
                          })}
            </div>
          </div>
          <div className={style.selectGenPlat}>
            <h3>Selected genres: </h3>
            <div className={style.toCloseDiv}>
            {input?.genres?.map((gen) => {
                return <div className={style.toClose}  key={gen}> <p className={style.pClose}>{gen}</p>   
                <button className={style.closeButton}  value={gen} onClick={(e) => handleDeleteGen(e)}> X </button>
                </div>
                })}
            </div>
          </div>
        </div>
      </div>
      <img src={input.image} style={{display:"none"}} alt="xd" onLoad={()=>handleImageLoad()} />
    </div>
  )
}

export default Update
