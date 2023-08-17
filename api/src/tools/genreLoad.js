const axios =require("axios")
const {Genre} = require("../db")
const {API_KEY} = process.env

const genreLoad = async ()=>{
    try {
        const db = await Genre.findAll()
        if(db.length === 0){ // Si no hay nada en la db, la carga con generos.

            //Me quedo ocn todo lo de la api
            const apiAll = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results

            const genres = apiAll.map(x=>x.name)
//PARA LA POSTERIDAD:
//NOTA MENTAL 
/*             //Obtengo todos los generos (Tanto objetos como arreglo de objetos)
            const genresRaw = apiAll.map(x=>x.genres)
            //Obtengo todos los nombres de todos los generos (repetidos)
            const genresRepeated = []
            genresRaw.forEach(x=>{
                if(typeof(x) === "object"){
                    x.forEach(z=>genresRepeated.push(z.name))
                }else {
                    genresRepeated.push(x.name)
                }
            })
            //Elimino los repetidos.
            const genres = [...new Set(genresRepeated)] */
          
            //Cargo la base de datos con cada genero.
            for(let i=0; i<genres.length; i++){
                await Genre.create({ name: genres[i]})
            } 
            console.log("Bdd cargada con éxito")
        }else{
            console.log("La bdd ya está cargada")
        }
    } catch (error) {
        return {error: error.message}
    }
}

module.exports={
    genreLoad
}
