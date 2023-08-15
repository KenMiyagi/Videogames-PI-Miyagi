const { Router } = require('express');
const userRouter = Router()
const {
    createUserHandler,
    loginHandler,
    getUserFavsHandler,
    userFavUpdateHandler,
    userProfPicUpdateHandler
} = require("../handlers/userHandlers")

//Registrado de un user
userRouter.post("/login", createUserHandler)

//Login (Devuelve o no acceso)
userRouter.get("/login", loginHandler)

//Ruta que trae todos los favoritos del usuario logueado.
userRouter.get("/fav", getUserFavsHandler)

//Ruta que "relaciona" los favoritos con el usuario.
userRouter.patch("/fav/:id",userFavUpdateHandler)

//Ruta que "relaciona" la foto de perfil con el usuario.
userRouter.patch("/profpic/:id", userProfPicUpdateHandler)


module.exports = userRouter