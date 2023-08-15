import React, { useEffect, useState } from 'react'
import style from "../style/Form.module.css"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { getVideoGames, postVideoGame, getGenres } from '../redux/actions/videoGameActions'
import { setNewErrors, clearErrors} from '../redux/actions/errorActions'
import {formValidation} from "../validation/formValidation"

const Form = () => {
  const dispatch = useDispatch()
  const genres = useSelector((state)=>state.genres)
  const navigate = useNavigate()
  const globalErrors = useSelector((state)=>state.errors)
  
  const [input, setInput] = useState({
    name:"",
    image:"",
    released:"",
    description:"",
    rating:0,
    platforms:[],
    genres:[]
  })

  useEffect(()=>{
    dispatch(getGenres())
    return ()=>dispatch(clearErrors())
  },[dispatch])

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

  const handleSubmit = async (event) => {
    event.preventDefault();
      if (Object.keys(errors).length === 0) {
        dispatch(postVideoGame(input)).then((postError) => {
          if (!postError) {
            setInput({
              name: "",
              image: "",
              released: "",
              description: "",
              rating: 0,
              platforms: [],
              genres: [],
            });
            dispatch(getVideoGames());
            navigate("/home");
            dispatch(clearErrors());
          }else{
            dispatch(setNewErrors({type:"POST_VIDEOGAME",error:postError.response.data}))
          }
        });
      }
  };

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
var isSubmitDisabled = Object.keys(errors).length > 0;
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
            <p className={style.errors} style={{visibility: errors.name ? "visible" : "hidden"}}>{errors.name}</p>
            <label className={style.labels} >Name of the video game:</label>
            <input className={style.inputs} autoComplete="off" onChange={handleChange} type="text" name="name"/>
          </div>

          <div className={style.inputContainer}>
            <label className={style.labels}>Image as a link:</label>
            <input className={style.inputs} autoComplete="off" onChange={handleChange} type="text" name="image"/>
          </div>

          <div className={style.inputContainer}>
            <p className={style.errors} style={{visibility: errors.released ? "visible" : "hidden"}}>{errors.released}</p>
            <label className={style.labels}>Released:</label>
            <input className={style.dateInput} autoComplete="off" onChange={handleChange} type="date" name="released"/>
          </div>

          <div className={style.inputContainer}>
            <p className={style.errors} style={{visibility: errors.description ? "visible" : "hidden"}}>{errors.description}</p>
            <label className={style.labels}>Description:</label>
            <textarea className={style.inputs}  autoComplete="off" onChange={handleChange} type="text" name="description"/>
          </div>

          <div className={style.ratPlatGen}>
            <div className={style.inputContainer}>
              <label className={style.labels}>Rating:</label>
              <input className={style.ratingInput} onChange={handleChange} type="number" name="rating" onkeydown="return event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode === 8 || event.keyCode === 46" min={1} max={5}/>
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
            <img className={style.imagePreview} src={input.image} alt={input.image.length>0 ? "Not found" : ""} />
            <div style={{display: "flex"}} >
              <input className={style.submit} type="submit" value="Cancel" onClick={()=>navigate(-1)}/>
              <input className={style.submit} disabled={isSubmitDisabled} style={isSubmitDisabled ? {opacity: "0.6", cursor: "not-allowed"}:null} type="submit" value="Submit" onClick={(event)=>handleSubmit(event)}/>
            </div>
            <p className={style.loginError} style={{visibility: globalErrors?.POST_VIDEOGAME ? "visible" : "hidden"}}>{globalErrors?.POST_VIDEOGAME?.error}</p>
          </div>
          <div className={style.selectGenPlat}>
            <h3>Selected platforms:</h3>
            <div className={style.toCloseDiv}>
            {input.platforms.map((plat)=>{
                          return <div className={style.toClose} key={plat}> <p className={style.pClose}>{plat}</p> 
                          <button className={style.closeButton} value={plat} onClick={(e) => handleDeletePlat(e)}> X </button> 
                          </div>
                          })}
            </div>
          </div>
          <div className={style.selectGenPlat}>
            <h3>Selected genres: </h3>
            <div className={style.toCloseDiv}>
            {input.genres.map((gen) => {
                return <div className={style.toClose}  key={gen}> <p className={style.pClose}>{gen}</p>   
                <button className={style.closeButton}  value={gen} onClick={(e) => handleDeleteGen(e)}> X </button>
                </div> 
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
