const {
    createUserController,
    getUserController,
    getUserFavsController,
    patchUserController
} = require("../controllers/userControllers")

const createUserHandler = async (req, res)=>{
    try {
        const {email, userName, password, favorites} = req.body
        const newUser = await createUserController(email, userName ,password, favorites)
        if(newUser) return res.status(200).json(newUser)
        return res.status(444).json({error: "Email in use"})
    } catch (error) {
        res.status(400).json({error:"Username already chosen"})
    }
}

const loginHandler = async (req, res) =>{
    try {
        const {email, password}= req.query
        if(!email) return res.status(400).json({access: false, error: "Missing email", type:"email"})
        if(!password) return res.status(400).json({access: false, error: "Missing password", type:"password"})
        const user = await getUserController(email)
        if(!user) return res.status(404).json({error: "User not found"})
        if(user.password === password){
            return res.status(200).json({access:true, user: user})
        }else{
            return res.status(403).json({error: "Incorrect password"})
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const getUserFavsHandler = async (req, res)=>{
    try {
        const {userId} = req.query
        const favs = await getUserFavsController(userId)
        res.status(200).json(favs)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const userFavUpdateHandler = async (req, res)=>{
    try {
        const {id} = req.params
        const {favorites} = req.body
        const response = await patchUserController({id, favorites})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const userProfPicUpdateHandler = async (req, res)=>{
    try {
        const {id} = req.params
        const {profilePicture} = req.body
        const response = await patchUserController({id, profilePicture})
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports={
    createUserHandler,
    loginHandler,
    getUserFavsHandler,
    userFavUpdateHandler,
    userProfPicUpdateHandler
}