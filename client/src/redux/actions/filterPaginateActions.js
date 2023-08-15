import axios from "axios"
export const ERRORS = "ERRORS"

export const ALL_FILTERS = "ALL_FILTERS"
export const ADD_FILTER = "ADD_FILTER"
export const REMOVE_FILTER = "REMOVE_FILTER"
export const SEARCH_FILTER = "SEARCH_FILTER"
export const PAGINATE = "PAGINATE"

export function addFilter(obj){
    return async function(dispatch){
        dispatch({
            type: ADD_FILTER,
            payload: obj
        })
    }
}

export function removeFilter(arg){
    return async function(dispatch){
        dispatch({
            type: REMOVE_FILTER,
            payload: arg
        })
    }
}

export function paginate(order){
    return async function(dispatch){
        dispatch({
            type:PAGINATE,
            payload: order
        })
    }
}

export function allFilters(){
    return async function(dispatch){
        dispatch({
            type: ALL_FILTERS,
            payload: "Se ejecutan los filtros ashe"
        })
    }
}

export function searchByName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/videogames?name=${name}`)
            dispatch({
                type: SEARCH_FILTER,
                payload: response.data
             })
        } catch (error) {
            dispatch({
                type: SEARCH_FILTER,
                payload: []
             })
        }
    }
}
