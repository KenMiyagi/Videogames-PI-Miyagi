import axios from "axios"
export const ERRORS = "ERRORS"

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