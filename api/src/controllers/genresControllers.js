const {Genre} = require("../db")
const getGenresController = async ()=>{
    const genres = await Genre.findAll()
    return genres
}

module.exports={
    getGenresController
}