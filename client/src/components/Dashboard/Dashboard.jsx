import React from 'react'
import style from "./Dashboard.module.css"
import Reload from "./Reload/Reload"
import SearchBar from "./SearchBar/SearchBar"
import Filters from "./Filters/Filters"

const Dashboard = () => {
  return (
    <div>
      <div className={style.components}>
            <Reload/>
            <SearchBar/>
            <Filters/>
          </div>
    </div>
  )
}

export default Dashboard
