import {
    GET_VIDEOGAMES,
    GET_DETAILS,
    GET_GENRES,
    POST_VIDEOGAME,
    PAGINATE,
    SEARCH_FILTER,
    CLEAR_DETAIL,
    DELETE_VIDEOGAME,
    NOT_RELOAD,
    PATCH_VIDEOGAME,
    ADD_FILTER,
    REMOVE_FILTER,
    ALL_FILTERS,
    LOGIN,
    LOG_OUT,
    GET_FAVS,
    REMOVE_FAV,
    ADD_FAV,
    UPDATE_FAVS,
    CLEAR_FAVS,
    ERRORS,
    CLEAR_ERRORS
} from "./actions"

let initialState = {
    //Paginado
    videoGames: [], currentPage:0, videoGamesPaginate:[], pageNumbers:[],
    //Filters
    videoGamesFiltered: [], filter:false, coincidences: true, arrayFilterArguments: [],
    //Details
    videoGameDetail: {}, notReload: false,
    //Generos
    genres:[],
    //CRUD
    patchVideoGame:{},

    //IDEAS LOCAS:
    access: false, user: {}, favs: [], loginError:"",

    filterNotFound:false, errors:{}
}

function rootReducer(state= initialState, action){
    const ITEMS_PER_PAGE = 15
    switch(action.type){
        case GET_VIDEOGAMES:
            console.log(state.errors)
            return {
                ...state,
                videoGames: action.payload,
                videoGamesPaginate: [...action.payload].splice(0,ITEMS_PER_PAGE),
            }
        case GET_DETAILS:
            return {
                ...state,
                videoGameDetail:action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case ERRORS:
            const errObj= action.payload
            console.log("ERROBJ: ",errObj);
            return {
                ...state,
                errors:{...state.errors,[errObj.type]:errObj.error}
            }
        case CLEAR_ERRORS:
            return{
                ...state, errors :{}
            }
        case POST_VIDEOGAME:
            return {
                ...state, errors :{}
            }
        case PAGINATE:
            const next_page = state.currentPage + 1;
            const prev_page = state.currentPage -1;
            const firstIndex = action.payload === "next" ? next_page * ITEMS_PER_PAGE : prev_page * ITEMS_PER_PAGE; 

            if (action.payload === "prev" && prev_page<0) {return {...state}}

            if(state.filter){
                if(firstIndex>= state.videoGamesFiltered.length){return {...state}}
                return{
                    ...state,
                    videoGamesPaginate: [...state.videoGamesFiltered].splice(firstIndex, ITEMS_PER_PAGE),
                    currentPage: action.payload === "next" ? next_page: prev_page,
                }
            }

            if(action.payload=== "next" && firstIndex >= [...state.videoGames].length){return {...state}}
            return {
                ...state,
                videoGamesPaginate: [...state.videoGames].splice(firstIndex, ITEMS_PER_PAGE),
                currentPage: action.payload === "next" ? next_page: prev_page,
            }
            case SEARCH_FILTER:
            const response = action.payload
            if(response.length>0){
                return{
                    ...state,
                    filter: true,
                    coincidences: true,
                    videoGamesFiltered: response,
                    videoGamesPaginate: response.slice(0, ITEMS_PER_PAGE)
                }
            }else{
                return {
                    ...state, filterNotFound: true, videoGamesPaginate:[]
                }
            }
            case CLEAR_DETAIL:
                return {
                    ...state,
                    videoGameDetail:{}
                }
        case DELETE_VIDEOGAME:
            return{
                ...state
            }
        case NOT_RELOAD:
            return {
                ...state,
                notReload: action.payload
            }
        case PATCH_VIDEOGAME:
            return {
                ...state,
                patchVideoGame: action.payload
            }
        case ADD_FILTER:
            let arr = state.arrayFilterArguments
            if(action.payload.type === "create"){
                //Elimino el anterior create
                arr = arr.filter(x=>x.type!=="create")
            }
            if(action.payload.type === "sort"){
                //Elimino el anterior create
                arr = arr.filter(x=>x.type!=="sort")  
            }
            if(action.payload.type === "genres"){
                //Elimino el anterior create
                arr = arr.filter(x=>x.type!=="genres")
            }
            arr = [...arr, action.payload]
            return {
                ...state,
                arrayFilterArguments: arr
            }
        case REMOVE_FILTER:

            const deleted = state.arrayFilterArguments.filter(x=>x.filterArgument!==action.payload)
            return{
                ...state,
                arrayFilterArguments: deleted
            }
        case ALL_FILTERS:
            const info = state.arrayFilterArguments
            const create = info.find(x=>x.type==="create")
            const sort = info.find(x=>x.type==="sort")
            const genres = info.find(x=>x.type==="genres")
            let filteredArr = state.videoGames
            if(create){
                if(create.filterArgument === "Api"){
                    filteredArr = filteredArr.filter(x=>x.createdInDb===false)
                }else if(create.filterArgument === "Data base"){
                    filteredArr = filteredArr.filter(x=>x.createdInDb===true)
                }
            }
            if(sort){
                if(sort.filterArgument==="A-Z"){
                    filteredArr = filteredArr.sort((a, b) => a.name.localeCompare(b.name))
                }else if(sort.filterArgument==="Z-A"){
                    filteredArr = filteredArr.sort((a, b) => b.name.localeCompare(a.name))
                }else if(sort.filterArgument==="Ascending rating"){
                    filteredArr = filteredArr.sort((a, b) => a.rating - b.rating)
                }else if(sort.filterArgument==="Descending rating"){
                    filteredArr = filteredArr.sort((a, b) => b.rating - a.rating)
                }
            }
            if(genres){
                    filteredArr = filteredArr.filter(x=>x.genres.some(z=>z.name===genres.filterArgument))
            }
            if(filteredArr.length > 0){
                return {
                    ...state,
                    filter: true,
                    videoGamesFiltered:filteredArr,
                    videoGamesPaginate: filteredArr.slice(0, ITEMS_PER_PAGE)
                }
            }else{
                return {
                    ...state, filterNotFound: true, videoGamesPaginate:[]
                }
            }
            
        case LOGIN:
            const {access, user, error} = action.payload
            if(!error){
                return {
                    ...state,
                    access: access,
                    user: user
                }
            }else{
                return{
                    ...state,
                    loginError:error
                }
            }
        case LOG_OUT:
            return {
                ...state,
                access:false
            }
        case GET_FAVS:
            return{
                ...state,
                favs: action.payload
            }
        case ADD_FAV:
            let favArrAdd = state.user.favorites;
            if (!favArrAdd.includes(action.payload)) {
                favArrAdd.push(action.payload);
            }
            return {
                ...state,
                user: { ...state.user, favorites: favArrAdd }
            };
        
        case REMOVE_FAV:
            const filteredFavs = state.user.favorites.filter(x => x !== action.payload);
            return {
                ...state,
                user: { ...state.user, favorites: filteredFavs }
            };
        case UPDATE_FAVS:
            return{
                ...state
            }
        case CLEAR_FAVS:
            return{
                ...state,
                favs:[]
            }
        default:
            return{
                ...state,
            }
        
    }
}

export default rootReducer;