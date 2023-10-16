import React, { useState } from 'react'
import style from "./SearchBar.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { searchByName } from '../../../redux/actions/filterPaginateActions'

const SearchBar = () => {

  const dispatch = useDispatch()
  const coincidences = useSelector(state=>state.coincidences)

  const [search, setSearch] = useState("")

  const handleChange = (event) =>{
    setSearch(event.target.value)
  }

  const auxFunction = (event) =>{
    if(event.key==="Enter"){
      searchSubmit()
    }
  }

  const searchSubmit = () =>{
    dispatch(searchByName(search))
  }

  return (
    <div className={style.searchBarContainer}>
      <p className={style.error} style={{visibility: !coincidences ? "visible" : "hidden", color:"red"}}>Not found</p>
        <div className={style.inputButtonDiv}>
          <input autoComplete="off" className={style.searchInput} onKeyDown={(event)=>{auxFunction(event)}} onChange={(event)=>handleChange(event)} type="text" name="search"/>
          <img src="https://cdn.discordapp.com/attachments/781222020770693152/1139718792788836484/image.png" alt="search-img" className={style.searchButton} onClick={(event)=>searchSubmit(event)}/>
        </div>
    </div>
  )
}

export default SearchBar
