import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFilter } from '../../../redux/actions/filterPaginateActions';
import { getGenres } from '../../../redux/actions/videoGameActions';
import style from "./Filters.module.css"
const Filters = () => {
    const dispatch = useDispatch()
    const arrayFilterArguments = useSelector((state)=>state.arrayFilterArguments)
  //Rating(Sort)
  const ascRatingSort = {type: "sort",filterArgument: "Ascending rating"}
  const desRatingSort = {type: "sort",filterArgument: "Descending rating"}
  //Order(Sort)
  const aZSort = {type: "sort",filterArgument: "A-Z"}
  const zASort = {type: "sort",filterArgument: "Z-A"}
//Create
  const bdd = {type: "create",filterArgument: "Data base"}
  const api = {type: "create",filterArgument: "Api"}

    const homeCreatedFilter = (created) => {
      if(created==="bdd"){
        const filter = arrayFilterArguments.filter(x=>x.filterArgument===bdd.filterArgument)
        if(filter.length===0){
          dispatch(addFilter(bdd))
        }
      }else if (created ==="api"){
        const filter = arrayFilterArguments.filter(x=>x.filterArgument===api.filterArgument)
        if(filter.length===0){
          dispatch(addFilter(api))
        }
      }
    };
    
    const homeOrderFilter = (order) => {
      if(order==="asc"){
        const filter = arrayFilterArguments.filter(x=>x.filterArgument===aZSort.filterArgument)
        if(filter.length===0){
          dispatch(addFilter(aZSort))
        }
      }else if (order ==="des"){
        const filter = arrayFilterArguments.filter(x=>x.filterArgument===zASort.filterArgument)
        if(filter.length===0){
          dispatch(addFilter(zASort))
        }
      }
    };
    
      const homeRatingFilter = (orden) => {
        if(orden==="asc"){
          const filter = arrayFilterArguments.filter(x=>x.filterArgument===ascRatingSort.filterArgument)
        if(filter.length===0){
          dispatch(addFilter(ascRatingSort))
        }
        }else if (orden ==="des"){
          const filter = arrayFilterArguments.filter(x=>x.filterArgument===desRatingSort.filterArgument)
          if(filter.length===0){
            dispatch(addFilter(desRatingSort))
          }
        }
    };
    const genres = useSelector(state=>state.genres)
  
    useEffect(()=>{
      dispatch(getGenres())
    },[dispatch])
  
    const handleGenres = (event)=>{
      event.preventDefault()
      if(event.target.value !== "Genres"){
        dispatch(addFilter({type: "genres", filterArgument:event.target.value}))
      }
    }

  return (
    <div className={style.filtersContainer}>
      <div className={style.filter}>
        <label className={style.labelTitle}>Filter by genres</label>
        <select value="Genres" className={style.select} onChange={(event) => handleGenres(event)}>
          <option>Genres</option>
          {
            genres.map((x, i)=>{
              return <option key={i} value={x.name}>{x.name}</option>
            })
          }
        </select>
    </div>
      <div className={style.filter}>
          <label className={style.labelTitle}>Filter by creation</label>
          <div className={style.buttonsDiv}>
            <button onClick={() => homeCreatedFilter('api')}><img className={style.icon} src="https://cdn.discordapp.com/attachments/781222020770693152/1138304861553831936/image.png" alt="API"/></button>
            <button onClick={() => homeCreatedFilter('bdd')}><img className={style.icon} src="https://cdn.discordapp.com/attachments/781222020770693152/1138304357197152276/image.png" alt="BDD"/></button>
          </div>
      </div>
      <div className={style.filter}>
          <label className={style.labelTitle}>Sort alphabetically</label>
          <div className={style.buttonsDiv}>
            <button onClick={() => homeOrderFilter('asc')}><img className={style.icon} src="https://cdn.discordapp.com/attachments/370336904664580106/1138301094682951731/image.png" alt="Ascendente"></img></button>
            <button onClick={() => homeOrderFilter('des')}><img className={style.icon} src="https://cdn.discordapp.com/attachments/370336904664580106/1138301143236231199/image.png" alt="Descendente"></img></button>
          </div>
      </div>
      <div className={style.filter}>
          <label className={style.labelTitle}>Sort by rating</label>
          <div className={style.buttonsDiv}>
            <button onClick={() => homeRatingFilter('asc')}><img className={style.icon} src="https://cdn.discordapp.com/attachments/370336904664580106/1138285208949493770/image.png" alt="Ascendente"></img></button>
            <button onClick={() => homeRatingFilter('des')}><img className={style.icon} src="https://cdn.discordapp.com/attachments/370336904664580106/1138285389761757254/image.png" alt="Descendente"></img></button>
          </div>
        </div>
    </div>
  )
}

export default Filters
