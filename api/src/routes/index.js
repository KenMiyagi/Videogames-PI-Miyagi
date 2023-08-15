const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGameRouter = require("./videoGamesRoutes")
const genresRouter = require("./genresRoutes")
const userRouter = require("./userRoutes")

const router = Router();

//Rutas
router.use("/videogames", videoGameRouter)

router.use("/genres", genresRouter)

router.use("/user", userRouter)

module.exports = router;
