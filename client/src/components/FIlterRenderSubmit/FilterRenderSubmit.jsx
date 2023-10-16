import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import style from "./FilterRenderSubmit.module.css"
import {removeFilter, allFilters} from "../../redux/actions/filterPaginateActions"
const FilterRenderSubmit = () => {
    const dispatch = useDispatch()
    const arrayFilterArguments = useSelector((state)=>state.arrayFilterArguments)

    const deleteFilter =(event)=>{
        dispatch(removeFilter(event.target.value))
      }
      const submitFilter= ()=>{
        dispatch(allFilters())
      }

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
