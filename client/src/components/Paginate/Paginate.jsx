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
      <div>
            <button className={style.paginateButtons} style={{visibility : pages.length===0 ? "hidden" : "visible"}} onClick={()=> setPaginate("prev")}> {"<"} </button>
            {
                pages.map((x) => (
                    <span
                      className={style.numeration}
                      style={{color : currentPage === x ? "red" : "#fff"}}
                      key={x}
                      onClick={() => setPaginate(x)}
                    >
                      {x}
                    </span>
                  ))
            }
            <button className={style.paginateButtons} style={{visibility : pages.length===0 ? "hidden" : "visible"}} onClick={()=> setPaginate("next")}>{">"} </button>
        </div>
    </div>
  )
}

export default Paginate
