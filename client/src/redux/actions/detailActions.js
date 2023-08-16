import axios from "axios"
import { GET_DETAILS, CLEAR_DETAIL} from "../actionTypes"

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