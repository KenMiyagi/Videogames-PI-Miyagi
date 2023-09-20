const { Router } = require('express');
const videoGameRouter = Router()
const {
    createVGHandler,
    getVGHandler,
    getVGByIdHandler,
    deleteVGHandler,
    updateVGHandler//HACER ESTE HANDLER CON CONTROLLADOR
} = require("../handlers/vGHandlers")
const {postValidation} = require("../tools/postValidation")
const {editGame} = require("../controllers/vGControllers")


//Gets
videoGameRouter.get("/", getVGHandler)
videoGameRouter.get("/:id", getVGByIdHandler)


//Post
videoGameRouter.post("/", postValidation, createVGHandler)


//Patch
videoGameRouter.patch("/:id", updateVGHandler)


//Delete
videoGameRouter.delete("/:id",deleteVGHandler)



module.exports = videoGameRouter