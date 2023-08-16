import axios from "axios"
//------------------------CRUD------------------------
/* export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const POST_VIDEOGAME = "POST_VIDEOGAME"
export const PATCH_VIDEOGAME = "PATCH_VIDEOGAME"
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME"
//------------------------CRUD------------------------
export const GET_GENRES = "GET_GENRES"
export const NOT_RELOAD = "NOT_RELOAD" */

import {ERRORS ,GET_VIDEOGAMES,
    POST_VIDEOGAME,
    PATCH_VIDEOGAME,
    DELETE_VIDEOGAME,
    GET_GENRES,
    NOT_RELOAD} from "../actionTypes"

export function getVideoGames(){
    return async function(dispatch){
        try {
            const response = (await axios.get("http://localhost:3001/videogames")).data
            dispatch({
                type:GET_VIDEOGAMES,
                payload: response
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
export function postVideoGame(input) {
    return async function(dispatch) {
      try {
        const response = await axios.post(`http://localhost:3001/videogames`, input);
        dispatch({
          type: POST_VIDEOGAME,
          payload: response.data
        });
        return false
      } catch (error) {
        dispatch({
            type:ERRORS,
            payload: {type: POST_VIDEOGAME, error:error.response.data}
        })
        return error
      }
    };
  }
export function patchVideoGame(input, id){
    return async function(dispatch){
        try {
            //Axios
            const response = (await axios.patch(`http://localhost:3001/videogames/${id}`, input)).data
            dispatch({
                type:PATCH_VIDEOGAME,
                payload: response
            })
            return false
        } catch (error) {
            dispatch({
                type:ERRORS,
                payload: {type: PATCH_VIDEOGAME, error:error.response.data}
            })
            return error
        }
    }
}

export function deleteVideoGame(id){
    return async function(dispatch){
        try {
            const response = (await axios.delete(`http://localhost:3001/videogames/${id}`)).data
            dispatch({
                type: DELETE_VIDEOGAME,
                payload: response
                })
        } catch (error) {
            throw new Error(error)
        }
    }
}


export function getGenres(){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/genres`)
            dispatch({
                type:GET_GENRES,
                payload: response.data
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}
export function notReloadAction(bool){
    return async function(dispatch){
        dispatch({
            type: NOT_RELOAD,
            payload: bool
        })
    }
}