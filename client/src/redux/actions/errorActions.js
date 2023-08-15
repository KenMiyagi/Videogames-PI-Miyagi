export const ERRORS = "ERRORS"
export const CLEAR_ERRORS = "CLEAR_ERRORS"

export function setNewErrors(obj){
    return async function(dispatch){
        dispatch({
            type: ERRORS,
            payload : obj
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