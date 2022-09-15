import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        const bearerToken = req.header("Authorisation").replace("Bearer", "")
        const decoded = jwt.verify(bearerToken, process.env.jwt_key)

        req.body.userId = decoded.userId
        next()
    } catch (error) {
        res.status(401).json({message:'Token is Invalid'})
    }
}