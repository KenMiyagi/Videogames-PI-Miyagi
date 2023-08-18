import React from 'react'
import { paginate } from '../../redux/actions/filterPaginateActions';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Paginate.module.css"

const Paginate = () => {
  const pages = useSelector((state)=>state.pages)
  const currentPage = useSelector((state)=>state.currentPage)
    const dispatch = useDispatch()

      const setPaginate = (x) =>{
        dispatch(paginate(x))
    }

  return (
    <div className={style.paginate}>
      <div className={style.buttonsDiv} >
        <img className={style.paginateDoubleButtons} src="https://cdn.discordapp.com/attachments/781222020770693152/1141883984066904095/image.png" style={{visibility : pages.length===0 ? "hidden" : "visible"}} onClick={()=> setPaginate(1)}/>
        <img className={style.paginateButtons} src="https://cdn.discordapp.com/attachments/781222020770693152/1141885658823139338/image.png" style={{visibility : pages.length===0 ? "hidden" : "visible"}} onClick={()=> setPaginate("prev")}/>
          {
            pages.map((x) => (
              <div
              className={currentPage === x ? style.currentNumeration : style.numeration}
              key={x}
              onClick={() => setPaginate(x)}
            >
              {x}
            </div>
              ))
          }
        <img className={style.paginateButtons} src="https://cdn.discordapp.com/attachments/781222020770693152/1141885514824302678/image.png" style={{visibility : pages.length===0 ? "hidden" : "visible"}} onClick={()=> setPaginate("next")}/>
        <img className={style.paginateDoubleButtons} src="https://cdn.discordapp.com/attachments/781222020770693152/1141884012890169445/image.png" style={{visibility : pages.length===0 ? "hidden" : "visible"}} onClick={()=> setPaginate(pages[pages.length-1])}/>
        </div>
    </div>
  )
}

export default Paginate
