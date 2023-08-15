import React from 'react'
import { paginate } from '../../redux/actions/filterPaginateActions';
import { useDispatch } from 'react-redux';
import style from "./Paginate.module.css"

const Paginate = () => {
    const dispatch = useDispatch()
    const nextPage = () => {
        dispatch(paginate('next'));
      };
    
      const prevPage = () => {
        dispatch(paginate('prev'));
      };

  return (
    <div className={style.paginate}>
        <img onClick={prevPage} className={style.button} src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt="left-arrow" />
        <img onClick={nextPage} className={style.button} src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="right-arrow" />
    </div>
  )
}

export default Paginate
