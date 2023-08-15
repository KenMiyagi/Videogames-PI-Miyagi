import axios from "axios"

//------------------------CRUD------------------------
export const GET_VIDEOGAMES = "GET_VIDEOGAMES"
export const POST_VIDEOGAME = "POST_VIDEOGAME"
export const PATCH_VIDEOGAME = "PATCH_VIDEOGAME"
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME"
//------------------------CRUD------------------------

//------------------------DETAILS------------------------
export const GET_DETAILS = "GET_DETAILS"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
//------------------------DETAILS------------------------

//------------------------FILTERS------------------------
export const ALL_FILTERS = "ALL_FILTERS"
export const ADD_FILTER = "ADD_FILTER"
export const REMOVE_FILTER = "REMOVE_FILTER"
export const SEARCH_FILTER = "SEARCH_FILTER"
//------------------------FILTERS------------------------

//------------------------USERS------------------------
export const LOGIN = "LOGIN"
export const LOG_OUT = "LOG_OUT"
export const SIGN_UP = "SIGN_UP"
export const NEW_PROFPIC = "NEW_PROFPIC"
//------------------------USERS------------------------

//------------------------USERS/FAVS------------------------
export const GET_FAVS = "GET_FAVS"
export const REMOVE_FAV = "REMOVE_FAV"
export const ADD_FAV = "ADD_FAV"
export const UPDATE_FAVS = "UPDATE_FAVS"
export const CLEAR_FAVS = "CLEAR_FAVS"
//------------------------USERS/FAVS------------------------

//------------------------ERRORS------------------------
export const ERRORS = "ERRORS"
export const CLEAR_ERRORS = "CLEAR_ERRORS"
//------------------------ERRORS------------------------

//Extra:
export const GET_GENRES = "GET_GENRES"
export const PAGINATE = "PAGINATE"
export const NOT_RELOAD = "NOT_RELOAD"

//-----------------------------Gets-----------------------------
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

//-----------------------------Details-----------------------------

export function getDetails(id){
    return async function(dispatch){
        try {
            const response = (await axios.get(`http://localhost:3001/videogames/${id}`)).data
            dispatch({
                type:GET_DETAILS,
                payload: response
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export function clearDetail(){
    return async function(dispatch){
        dispatch({
            type: CLEAR_DETAIL,
            payload: null
        })
    }
}

//-----------------------------Post-----------------------------
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

export function setNewErrors(obj){
    return async function(dispatch){
        dispatch({
            type: ERRORS,
            payload : obj
        })
    }
}

//-----------------------------Paginate-----------------------------
export function paginate(order){
    return async function(dispatch){
        dispatch({
            type:PAGINATE,
            payload: order
        })
    }
}
//-----------------------------Filters-----------------------------

//-----------------------------searchByName-----------------------------
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

//-----------------------------GenresFilter-----------------------------
export function genresFilter(genre){
    return async function(dispatch){
        dispatch({
           type: GENRES_FILTER,
           payload: genre
        })
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

export function notReloadAction(bool){
    return async function(dispatch){
        dispatch({
            type: NOT_RELOAD,
            payload: bool
        })
    }
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

//

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

export function allFilters(){
    return async function(dispatch){
        dispatch({
            type: ALL_FILTERS,
            payload: "Se ejecutan los filtros ashe"
        })
    }
}

export function login(userData){
    return async function(dispatch){
        try {
            const {email, password} = userData
            const response = await axios.get(`http://localhost:3001/user/login?email=${email}&password=${password}`)         
            console.log("RESPONSE: ",response);
            const {data} = response
            dispatch({
                type: LOGIN,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ERRORS,
                payload: {type: LOGIN ,error:error.response.data}
            })
        }
    }
}

export function logOut(){
    return async function(dispatch){
        dispatch({
            type: LOG_OUT,
            payload: null
        })
    }
}

export function signUp(userData){
    return async function(dispatch){
        try {
            const response = await axios.post(`http://localhost:3001/user/login`, userData)
            dispatch({
                type: SIGN_UP,
                payload: response.data
            })
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: ERRORS,
                payload: {type: SIGN_UP ,error:error.response.data}
            })
        }
    }

}

export function newProfPic(userId, profPic){
    return async function(dispatch){
        try {
            //Axios
            const response = (await axios.patch(`http://localhost:3001/user/profpic/${userId}`, {profilePicture:profPic})).data
            dispatch({
                type:NEW_PROFPIC,
                payload: response
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export function getFavs(userId){
    return async function(dispatch){
        try {
            const response = userId ? (await axios.get("http://localhost:3001/user/fav?userId="+userId)).data : null
            dispatch({
                type: GET_FAVS,
                payload: response
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export function removeFav(id){
    return async function(dispatch){
        dispatch({
            type: REMOVE_FAV,
            payload: id
        })
    }
}

export function addFav(id){
    return async function(dispatch){
        dispatch({
            type: ADD_FAV,
            payload: id
        })
    }
}

export function updateFavs(userId, favorites){
    return async function(dispatch){
        try {
            //Axios
            const response = (await axios.patch(`http://localhost:3001/user/fav/${userId}`, {favorites:favorites})).data
            dispatch({
                type:UPDATE_FAVS,
                payload: response
            })
        } catch (error) {
            throw new Error(error)
        }
    }
}

export function clearFavs(){
    return async function(dispatch){
        dispatch({
            type:CLEAR_FAVS,
            payload: CLEAR_FAVS
        })
    }
}

export function clearErrors(){
    return async function(dispatch){
        dispatch({
            type:CLEAR_ERRORS,
            payload: null
        })
    }
}