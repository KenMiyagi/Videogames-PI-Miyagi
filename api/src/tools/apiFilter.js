const apiFilter = (array) =>{
    const clear = array.map((el) => {
        if(!el.name){
        }
        const platformsArray = el.platforms
        const platArray = platformsArray ? platformsArray.map(x=>x.platform.name) : []

        const apiGenres = el.genres ? el.genres.map(x=>{
            return {name: x.name}
        }) : [{name:"no genres"}]
        return {
            id: el.id ? el.id : "undefined ID",
            name: el.name ? el.name : "undefined NAME",
            image: el.background_image ? el.background_image : "undefined IMAGE",
            description: el.description ? el.description : "undefined DESCRIPTION",
            released: el.released ? el.released : "undefined RELEASED",
            rating: el.rating ? el.rating : "undefined RATING",
            platforms: platArray,
            genres: apiGenres,
            createdInDb: false
        }
    })
    return clear
}

module.exports = {
    apiFilter
}