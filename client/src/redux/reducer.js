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
    CLEAR_ERRORS,
} from "./actionTypes"

let initialState = {
    //Paginado
    videoGames: [], currentPage:1, videoGamesPaginate:[],pages:[], 
    //Filters
     arrayFilterArguments: [], filteredPaginate:[], coincidences: true,
    //Details
    videoGameDetail: {}, notReload: false,
    //Generos
    genres:[],
    //CRUD
    patchVideoGame:{},

    //IDEAS LOCAS:
    access: false, user: {}, favs: [],

    filterNotFound:false, errors:{}
}

function rootReducer(state= initialState, action){
    const ITEMS_PER_PAGE = 15
    switch(action.type){
        case GET_VIDEOGAMES:
            const totalPagesGet = Math.ceil(action.payload.length / ITEMS_PER_PAGE)
            const pagesGet = [...Array(totalPagesGet + 1).keys()].slice(1);

            const indexOfLastPageGet = state.currentPage  * ITEMS_PER_PAGE;
            const indexOfFirstPageGet = indexOfLastPageGet - ITEMS_PER_PAGE;

            const videoGamesRenderGet = action.payload.slice(indexOfFirstPageGet,indexOfLastPageGet)
            return {
                ...state,
                videoGames: action.payload,
                filteredPaginate:action.payload,
                videoGamesPaginate:videoGamesRenderGet,
                pages: pagesGet,
                currentPage:1,
                coincidences: true
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
        case PATCH_VIDEOGAME:
        case POST_VIDEOGAME:
        case CLEAR_ERRORS:
            return{
                ...state, errors :{}
            }
        case PAGINATE:
            var currentP
            if(isNaN(action.payload)){
                if(action.payload==="next"){
                    //CURRENT ++
                    if(state.currentPage !== state.pages.length){ currentP = state.currentPage+1}else{
                        return{...state}
                    }
                }else if(action.payload==="prev"){
                    //CURRENT --
                    if(state.currentPage !== 1){ currentP = state.currentPage-1}else{
                        return{...state}
                    }
                }
            }else{
                //SET CURRENT con payload
                 currentP = action.payload
            }
            const totalPages = Math.ceil(state.filteredPaginate.length / ITEMS_PER_PAGE)
            const pages = [...Array(totalPages + 1).keys()].slice(1);
            const indexOfLastPage = currentP  * ITEMS_PER_PAGE;
            const indexOfFirstPage = indexOfLastPage - ITEMS_PER_PAGE;
            const videoGamesRender = state.filteredPaginate.slice(indexOfFirstPage,indexOfLastPage)
            return {
                ...state,
                currentPage: currentP,
                videoGamesPaginate: videoGamesRender,
                pages:pages
            }
        case SEARCH_FILTER:
            const response = action.payload
            if(response.length>0){
                const totalPages = Math.ceil(response.length / ITEMS_PER_PAGE)
                const pages = [...Array(totalPages + 1).keys()].slice(1);
                const indexOfLastPage = 1  * ITEMS_PER_PAGE;
                const indexOfFirstPage = indexOfLastPage - ITEMS_PER_PAGE;

                const videoGamesRender = response.slice(indexOfFirstPage,indexOfLastPage)
                return{
                    ...state,
                    currentPage:1,
                    filteredPaginate:response,
                    pages:pages,
                    videoGamesPaginate:videoGamesRender
                }
            }else{
                return {
                    ...state, filterNotFound: true, videoGamesPaginate:[], pages:[], coincidences:false
                }
            } 
        case CLEAR_DETAIL:
            return {
                ...state,
                videoGameDetail:{}
            }
        case NOT_RELOAD:
            return {
                ...state,
                notReload: action.payload
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
                const totalPages = Math.ceil(filteredArr.length / ITEMS_PER_PAGE)
                const pages = [...Array(totalPages + 1).keys()].slice(1);

                const indexOfLastPage = ITEMS_PER_PAGE;
                const indexOfFirstPage = indexOfLastPage - ITEMS_PER_PAGE;

                const videoGamesRender = filteredArr.slice(indexOfFirstPage,indexOfLastPage)
                return {
                    ...state,
                    filteredPaginate:filteredArr,
                    pages:pages,
                    currentPage:1,
                    videoGamesPaginate:videoGamesRender
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