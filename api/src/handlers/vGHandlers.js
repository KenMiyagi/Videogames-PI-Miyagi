const {
    createVGController,
    getVGByNameController,
    getAllVGController,
    getVGByIdController,
    deleteVGController,
    updateVGController
} = require("../controllers/vGControllers") 

const getVGHandler = async (req, res)=>{
    try {
        const {name} = req.query
        const response = name 
        ? await getVGByNameController(name)
        : await getAllVGController()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getVGByIdHandler = async (req, res)=>{
    const {id} =req.params
    const flag = isNaN(id) ? "bdd" : "api"
    try {
        const vg = await getVGByIdController(id,flag)
        res.status(200).json(vg)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
} 

const createVGHandler= async (req, res)=>{
    try {
        const {name, image, description, platforms, released, rating, genres} = req.body
        const newVG = await createVGController({name, image, description, platforms, released, rating}, genres)
        if(newVG){
            res.status(200).json(newVG)
        }else{ res.status(400).json({error:"The game already exists"})}
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteVGHandler = async (req, res)=>{
    try {
        const {id} = req.params
        const response = await deleteVGController(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const updateVGHandler = async (req, res)=>{
    try {
        const {id} = req.params
        const props = req.body
        const response = await updateVGController({...props, id})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const editGame = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, platforms, genres, image, rating, released} = req.body;
      const editedGame = await Videogame.update(
        {
          name: name,
          image:image,
          rating:rating,
          released:released,
          description: description,
          platforms: platforms,
          genres: genres,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if(editedGame[0] === 0) {
        return res.status(404).json({ error:'No se encuentra el juego solicitado' });
      }
  
      const gameUpdated = await Videogame.findByPk(id);
  
      if (genres) {
        await gameUpdated.setGenres([]);
        for (const el of genres) {
          let genreFinded = await Genre.findOne({
            where: {
              name: el,
            },
          });
          await gameUpdated.addGenre(genreFinded);
        }
      }
  
      return res.status(200).json({
        message: 'Juego modificado con éxito!',
        result: gameUpdated,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({error:error.message});
    }
};


module.exports={
    createVGHandler,
    getVGHandler,
    getVGByIdHandler,
    deleteVGHandler,
    updateVGHandler
}