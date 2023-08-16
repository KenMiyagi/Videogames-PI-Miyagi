import React from 'react'
import { paginate , paginate2} from '../../redux/actions/filterPaginateActions';
import { useDispatch, useSelector } from 'react-redux';
import style from "./Paginate.module.css"

const Paginate = () => {
  const pages = useSelector((state)=>state.pages)
  const currentPage = useSelector((state)=>state.currentPage)
    const dispatch = useDispatch()
/*     const nextPage = () => {
        dispatch(paginate('next'));
      };
    
      const prevPage = () => {
        dispatch(paginate('prev'));
      }; */
      const setPaginate = (x) =>{
        dispatch(paginate2(x))
    }

  return (
    <div className={style.paginate}>
      <div>
            <button onClick={()=> setPaginate("prev")}>prev</button>
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
            <button onClick={()=> setPaginate("next")}>next</button>
        </div>
    </div>
  )
}

export default Paginate
