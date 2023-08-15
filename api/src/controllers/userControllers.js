const {API_KEY} = process.env
const {apiFilter} = require("../tools/apiFilter")

const axios = require("axios")
const {User} = require("../db")

const createUserController = async (email, userName, password, favorites)=>{
    const [newUser,created] = await User.findOrCreate({
        where: {email},
        defaults: {userName, password, favorites}
    })
    if(created)return newUser
    return false
}

const getUserController = async (email) =>{
    const user = await User.findOne({where : {email}})
    return user
}

const getUserFavsController = async (id)=>{
    const user = await User.findOne({where : {id}})
    const favsResponse = user.favorites.map(x=>axios.get(`http://localhost:3001/videogames/${x}`))
    const resolved = await Promise.all(favsResponse)
    const favs = resolved.map((x)=>x.data)
    return favs
}

const patchUserController = async (props)=>{
    const {id, userName, profilePicture, favorites} = props
    let obj = {}
    if(userName) obj.userName = userName
    if(profilePicture) obj.profilePicture = profilePicture
    if(favorites) obj.favorites = favorites
    const editedUser = await User.update(obj,
        {
          where: {
            id: id,
          },
        }
      );
    return editedUser
}

module.exports={
    createUserController,
    getUserController,
    getUserFavsController,
    patchUserController
}