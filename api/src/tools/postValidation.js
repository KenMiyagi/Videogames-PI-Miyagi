const {Genre} = require("../db")
//name, image, description, platforms, released, rating, genres
const postValidation = async (req, res, next)=>{
    const {name, image, description, platforms, released, rating, genres} = req.body
    if (!name)  return res.status(400).json ({error: "Missing name"})
    if (!description)  return res.status(400).json ({error: "Missing description"})
    if (!released)  return res.status(400).json ({error: "Missing released"})
    if (!rating)  return res.status(400).json ({error: "Missing rating"})
    if (!platforms)  return res.status(400).json ({error: "Missing platforms"})
    if (!genres)  return res.status(400).json ({error: "Missing genres"})

    if(typeof(name) !== "string") return res.status(400).json ({error: "Name has to be an string"})
    if(typeof(released) !== "string") return res.status(400).json ({error: "released has to be an string"})
    if(typeof(description) !== "string") return res.status(400).json ({error: "description has to be an string"})
    if(typeof(rating) !== "number") return res.status(400).json ({error: "rating has to be an integer"})
    if(typeof(platforms) !== "object") return res.status(400).json ({error: "platforms has to be an array"})
    if(typeof(genres) !== "object") return res.status(400).json ({error: "genres has to be an array"})

      // Obtiene todas las dietas existentes en la base de datos
  const existingGenres = await Genre.findAll();

  // Verifica si los nombres de dieta en genres son diferentes a los existentes en la base de datos
  const invalidGenre = genres.filter((genreName) => {
    return !existingGenres.some((genre) => genre.name === genreName);
  });

  if (invalidGenre.length > 0) {
    return res.status(400).json({error: `Invalid genre input: (${invalidGenre.join(", ")})`})
  }

    next();
}


module.exports = {
  postValidation
}