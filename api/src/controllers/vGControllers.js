const axios = require("axios")
const {Videogame, Genre} = require("../db")
const {API_KEY} = process.env
const {apiFilter} = require("../tools/apiFilter")
const {Op}= require("sequelize")

const getVGByNameController = async(name)=>{
    const dataBaseResponse = await Videogame.findAll({
        where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
    })
    
    //Obtengo todo de la api (Información coincidente)
    const api = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)).data.results

    const apiResponse = await apiFilter(api)

    //Si finalResponse tiene largo retornamos una concatenación de los dos arreglos con la información.
    const finalResponse = [...dataBaseResponse, ...apiResponse]
    if(finalResponse.length) return finalResponse
    throw Error("Couldn't find coincidences")
}

const getAllVGController = async()=>{
    //Obtengo todo de la base de datos (Información coincidente).
    const dataBaseResponse = await Videogame.findAll({
        include: [
            {
                model: Genre,
                attributes: ["name"],
                through: {attributes: []}
            }
        ]
    })

    let arrayWithPromises = []
    for(let i =1; i<6; i++){
      arrayWithPromises = [...arrayWithPromises,axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)]
    }
    
    let arrayWithObjects = []

    const resolved = await Promise.all(arrayWithPromises)
    const api = resolved.map((x)=>x.data.results)
    api.forEach(x=>x.forEach(z=>{
      arrayWithObjects.push(z)
    }))
    
    const apiResponse = apiFilter(arrayWithObjects)
    return [...dataBaseResponse,...apiResponse]
}


const createVGController = async (props, genres)=>{
    //Creo el videojuego en la base de datos
    const {name} = props
    const img = "https://media.wired.com/photos/62feb60bcea7c0581e825cb0/4:3/w_2131,h_1598,c_limit/Fate-of-Game-Preservation-Games-GettyImages-1170073827.jpg"
    const [newVG, created] = await Videogame.findOrCreate({
        where: {name},
        defaults: {...props, image: props.image ? props.image : img} 
    })
    if(created){
      //Hago la relación para que 
      for(let i=0; i<genres.length; i++){
          const genreId = (await Genre.findOne({
              where:{
                  name: genres[i]
              }
          })).id
          await newVG.addGenre(genreId)
      }
      //Retorno el videojuego creado
      const returning = await Videogame.findOne({
          where: {
              id:newVG.id
          },
          include: [
              {
                model: Genre,
                attributes: ["name"],
                through: { attributes: [] },
              },
            ],
      })
      return returning
    }return false
}

const getVGByIdController = async (id, source)=>{
    if(source==="api"){
        const api = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data
        const apiResponse = await apiFilter([api])
        return apiResponse[0]
    }else{
        const dataBaseResponse = await Videogame.findByPk(id,{
            include: [
              {
                model: Genre,
                attributes: ["name"],
                through: { attributes: [] },
              },
            ],
          })
          return dataBaseResponse
    }
}

const deleteVGController = async(id)=>{
  await Videogame.destroy({where:{id}})
  const vg = Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    ]
  })
  return vg
}

const updateVGController= async (props)=>{
  const {id, name, description, platforms, genres, image, rating, released} = props
  let obj = {}
  if(name) obj.name = name
  if(description) obj.description = description
  if(platforms) obj.platforms = platforms
  if(genres) obj.genres = genres
  if(image) obj.image = image
  if(rating) obj.rating = rating
  if(released) obj.released = released

  //Verifico que no exista un videojuego con el mismo nombre.

  const existingGame = await Videogame.findOne({ where: {name:name}})
  if(existingGame && existingGame.id !== id){
    throw new Error("That game already exists")
  }

  const editedGame = await Videogame.update(obj,{
    where: {
      id: id
    }
  })
  if(editedGame[0] === 0){
    throw new Error("Couldn't find the videogame.")
  }
  if(genres){
    const vg = await Videogame.findByPk(id)

    await vg.setGenres([]); //ELimino las relaciones anteriores.

    //Creo las nuevas relaciones.
    for(let i=0; i<genres.length; i++){
      const genreId = (await Genre.findOne({
          where:{
              name: genres[i]
          }
      })).id
      await vg.addGenre(genreId)
    }
  }
  return editedGame[0]
}

module.exports={ createVGController, getVGByNameController, getAllVGController, getVGByIdController, deleteVGController, updateVGController,
}