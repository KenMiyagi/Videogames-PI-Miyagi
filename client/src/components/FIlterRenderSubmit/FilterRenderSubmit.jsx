import React from 'react'
import {useSelector, useDispatch} from "react-redux"
import style from "./FilterRenderSubmit.module.css"
import {removeFilter, allFilters} from "../../redux/actions/filterPaginateActions"
import Reload from '../Dashboard/Reload/Reload'
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
            <div className={style.filtersDiv}>
            {arrayFilterArguments.length > 0 ? arrayFilterArguments?.map((obj) => {
                return <div className={style.filterDivRender}  key={obj.filterArgument}> <p className={style.filterName}>{obj.filterArgument}</p>   
                        <button className={style.filterCloseButton}  value={obj.filterArgument} onClick={(event) => deleteFilter(event)}> X </button>
                       </div> 
                }):<label className={style.notSelected}>Selected Filters/Sorts</label>}
            </div>
                <button className={style.searchButton} onClick={()=>submitFilter()}>Filter</button>
                <Reload/>
        </div>
    </div>
  )
}

export default FilterRenderSubmit
