import React, { useEffect, useState } from 'react'
import style from "../style/Form.module.css"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getGenres, getVideoGames, postVideoGame} from "../redux/actions"
import {formValidation} from "../validation/formValidation"

const Form = () => {

  const dispatch = useDispatch()
  const genres = useSelector((state)=>state.genres)
  const navigate = useNavigate()

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
  },[dispatch])

  const [errors, setErrors] = useState({})
  
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

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(Object.keys(errors).length===0){
      dispatch(postVideoGame(input))
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
      navigate("/home")
    }else{
      console.log("ERRORS",errors);
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
          <input className={style.submit} disabled={isSubmitDisabled} style={isSubmitDisabled ? {opacity: "0.6", cursor: "not-allowed"}:null} type="submit" value="Submit" onclick={(event)=>handleSubmit(event)}/>
        </form>
        <div className={style.selected}>
          <div className={style.selectGenPlat}>
            <h3> Plataformas seleccionadas: </h3>
            <div className={style.toCloseDiv}>
            {input.platforms.map((plat)=>{
                          return <div className={style.toClose} key={plat}> <p className={style.pClose}>{plat}</p> 
                          <button className={style.closeButton} value={plat} onClick={(e) => handleDeletePlat(e)}> X </button> 
                          </div>
                          })}
            </div>
          </div>
          <div className={style.selectGenPlat}>
            <h3>Generos seleccionados:  </h3>
            <div className={style.toCloseDiv}>
            {input.genres.map((gen) => {
                return <div className={style.toClose}  key={gen}> <p className={style.pClose}>{gen}</p>   
                <button className={style.closeButton}  value={gen} onClick={(e) => handleDeleteGen(e)}> X </button>
                </div> 
                })}
            </div>
          </div>
          <div className={style.imageRender}>
          <h3>Image preview:  </h3>
            <img className={style.imagePreview} src={input.image} alt={input.image.length>0 ? "Not found" : ""} />
          </div>
          </div>
      </div>
    </div>
  )
}

export default Form

/* 
.container {
  background-color: #111133;
  padding: 20px;
}

.title {
  margin: 10px;
  color: #ff99cc;
  font-size: 25px;
  text-shadow: 2px 2px 4px #000000;
}

.formContainer {
  display: flex;
  flex-direction: row;
  background-color: #242444;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px; 
}

.form {
  width: 450px;
  padding: 20px;
  margin-left: 50px;
  border-radius: 10px;
  margin-right: 50px;
}

.inputContainer {
  margin-bottom: 15px;
}

.labels {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #ff99cc;
}

.inputs{
  width: 95%;
  padding: 10px;
  border: 1px solid #444466;
  border-radius: 4px;
  background-color: #1a1a33;
  color: #ffffff;
}

.ratingInput{
  width: 100px;
  padding: 10px;
  border: 1px solid #444466;
  border-radius: 4px;
  background-color: #1a1a33;
  color: #ffffff;
}

.submit{
  background-color: #ff99cc;
  color: #ffffff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: background-color 0.3s ease;
  margin-top: 15px;
}

.submit:hover {
  background-color: #ff6699;
}


.selected {
  display: inline-block;
  background-color:#8b0c4c70;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #ffffff;
  width: 620px;
}
.selectGenPlat{
  display:flex;
  flex-direction: column;
  margin-bottom: 100px;
  height: 100px; 

}

.toCloseDiv{
  display:flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
}

.toClose{
  display: flex;
  justify-content: space-between;

  margin-bottom: 7px;

  background-color: #32495cc0;
  padding: 2px;
  border-radius: 8px;
  min-width: 140px;
  margin-left: 3px;
  scale:0.99
}

.pClose{
margin: 0%;
}

.closeButton {
  color: #ffffff;
  background-color: #f50606;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 10px;
  cursor: pointer;
  margin-left: 5px;
  transition: background-color 0.3s ease;
}

.closeButton:hover {
  background-color: #b64949;
}



.errors,
.selectErrors {
  font-weight: bold;
  font-size: 12px;
  color: #f1404088;
  padding: 1px;
  height: 0;
  text-align: center;
}


.formSelect{
  background-color: #1a1a33;
  color: #ffffff;
  border: 1px solid #444466;
  border-radius: 4px;
  padding: 8px;
}

option {
  background-color: #1a1a33;
}


.selectGenPlat h3 {
  color: #ff99cc;
  font-size: 24px;
}

.imageRender {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.imagePreview {
  width: 300px;
  height: 250px;
  border: 2px solid #ff99cc;
  border-radius: 10px;
  margin-top: 10px;
  object-fit: cover;
}
.imageRender h3{
  color: #ff99cc;
  font-size: 24px;
}

.ratPlatGen {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
}
 */

switch(asd){
           case CREATED_FILTER: 
            if(action.payload === "api"){
                return{
                    ...state,
                    filter:true,
                    videoGamesFiltered: [...state.videoGames].filter(x=>x.createdInDb===false),
                    videoGamesPaginate: [...state.videoGames].filter(x=>x.createdInDb===false).splice(0,ITEMS_PER_PAGE)
                }
            }else{
                return{
                    ...state,
                    filter: true,
                    videoGamesFiltered:[...state.videoGames].filter(x=>x.createdInDb===true),
                    videoGamesPaginate: [...state.videoGames].filter(x=>x.createdInDb===true).splice(0,ITEMS_PER_PAGE)
                }
            }
        case ORDER_FILTER:
            let sortedVideoGames;
            if(action.payload === "asc"){
                sortedVideoGames = [...state.videoGames].sort((a, b) => a.name.localeCompare(b.name))
            }else if(action.payload === "des"){
                sortedVideoGames = [...state.videoGames].sort((a ,b) => b.name.localeCompare(a.name))
            }
            return{
                ...state,
                filter: true,
                videoGamesFiltered: sortedVideoGames,
                videoGamesPaginate: sortedVideoGames.slice(0, ITEMS_PER_PAGE)
            }
        case RATING_FILTER:
            let ratingSortedVideoGames;
            if(action.payload === "asc"){
                ratingSortedVideoGames = [...state.videoGames].sort((a, b) => a.rating - b.rating);
            }else if(action.payload === "des"){
                ratingSortedVideoGames = [...state.videoGames].sort((a, b) => b.rating - a.rating);
            }
            return{
                ...state,
                filter: true,
                videoGamesFiltered: ratingSortedVideoGames,
                videoGamesPaginate: ratingSortedVideoGames.slice(0, ITEMS_PER_PAGE)
            }
        case SEARCH_FILTER:
            const response = action.payload
            if(response.length>0){
                return{
                    ...state,
                    filter: true,
                    coincidences: true,
                    videoGamesFiltered: response,
                    videoGamesPaginate: response.slice(0, ITEMS_PER_PAGE)
                }
            }else{
                return {
                    ...state,
                    coincidences: false
                }
            }
        case GENRES_FILTER:
            if(action.payload !== "Generos"){
                const videoGames = state.videoGames;
                const filtered = videoGames.filter(x=>{
                    return x.genres.some(z=>z.name===action.payload)
                })
                return{
                    ...state,
                    videoGamesFiltered: filtered,
                    filter: true,
                    videoGamesPaginate: filtered.slice(0, ITEMS_PER_PAGE)
                }
            }else{
                return{
                    ...state,
                    videoGamesFiltered: state.videoGames,
                    filter: true,
                    videoGamesPaginate: state.videoGames.slice(0, ITEMS_PER_PAGE)
                }
            } 
}