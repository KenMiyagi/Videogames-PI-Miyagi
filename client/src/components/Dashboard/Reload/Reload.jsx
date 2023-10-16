import React from 'react'
import style from "./Reload.module.css"
import {useDispatch} from "react-redux"
import {getVideoGames} from "../../../redux/actions/videoGameActions"
import {paginate} from "../../../redux/actions/filterPaginateActions"

const Reload = () => {
const dispatch = useDispatch()

  const reloadVG = ()=>{
    dispatch(getVideoGames())
    dispatch(paginate(1))
  }
  return (
    <div>
      <img onClick={()=>reloadVG()} className={style.icon} src="https://cdn.discordapp.com/attachments/781222020770693152/1138697413561942076/image.png" alt="Reload"/>
    </div>
  )
}

export default Reload
