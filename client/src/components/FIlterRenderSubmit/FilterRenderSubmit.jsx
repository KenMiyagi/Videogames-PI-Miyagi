import React, {useState} from 'react'
import style from "./FilterRenderSubmit.module.css"
const FilterRenderSubmit = () => {

    const arrayFilterArguments = useSelector((state)=>state.arrayFilterArguments)
  return (
    <div>
      <div className={style.filtersRender}>
            <h2 className={style.filtersRenderTitle}>Selected Filters/Sorts: </h2>
            <div className={style.filtersDiv}>
            {arrayFilterArguments.map((obj) => {
                return <div className={style.filterDivRender}  key={obj.filterArgument}> <p className={style.filterName}>{obj.filterArgument}</p>   
                <button className={style.filterCloseButton}  value={obj.filterArgument} onClick={(event) => deleteFilter(event)}> X </button>
                </div> 
                })}
            </div>
                <button className={style.searchButton} onClick={()=>submitFilter()}>Filter</button>
          </div>
    </div>
  )
}

export default FilterRenderSubmit
