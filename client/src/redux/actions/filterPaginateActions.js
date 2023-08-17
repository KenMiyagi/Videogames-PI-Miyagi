import axios from "axios"

import {ALL_FILTERS, ADD_FILTER, REMOVE_FILTER, SEARCH_FILTER, PAGINATE, PAGINATE2} from "../actionTypes"

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

export function paginate(x){
    return async function(dispatch){
        dispatch({
            type:PAGINATE,
            payload: x
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
            console.log("RESPONSE EN ACTION: ",response);
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
