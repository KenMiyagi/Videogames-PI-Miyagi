import axios from "axios"
export const GET_DETAILS = "GET_DETAILS"
export const CLEAR_DETAIL = "CLEAR_DETAIL"

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