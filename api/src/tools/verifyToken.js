const verifyToken = (req, res, next)=>{
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(200).json({error:"No se obtuvo Token"})
    }
    try {
        const decodedToken = jwt.verify(token,"Mi firma");
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        return res.status(401).json({error:"Token Inválido"})       
    }
}

module.exports = {
    verifyToken
}