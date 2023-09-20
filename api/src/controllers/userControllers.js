const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios")
const {User} = require("../db")

const createUserController = async (email, userName, password, favorites)=>{
    
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    const [newUser,created] = await User.findOrCreate({
        where: {email},
        defaults: {userName, password:hashedPassword, favorites}
    })

    
    
    if(created){
        const usedId = newUser.id
        const token = jwt.sign({usedId},"Mi firma")
        return {newUser, token}
    }
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

module.exports={ createUserController, getUserController, getUserFavsController, patchUserController
}