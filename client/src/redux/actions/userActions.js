import axios from "axios"
import { ERRORS,
//------------------------USERS------------------------
    LOGIN, 
    LOG_OUT, 
    SIGN_UP, 
    NEW_PROFPIC, 
//------------------------USERS/FAVS------------------------
    GET_FAVS, 
    REMOVE_FAV, 
    ADD_FAV, 
    UPDATE_FAVS, 
    CLEAR_FAVS} from "../actionTypes"

export function login(userData){
    return async function(dispatch){
        try {
            const {email, password} = userData
            const response = await axios.get(`http://localhost:3001/user/login?email=${email}&password=${password}`)
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
            return false
        } catch (error) {
            dispatch({
                type: ERRORS,
                payload: {type: SIGN_UP ,error:error.response.data}
            })
            return error
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

//------------------------USERS/FAVS------------------------

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