import User from '../models/userModel'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import {verifyToken} from '../middleware/tokenizer'


export const signup = async (req, res, next) => {
    const {firstname, lastname, email, password, repassword} = req.body

    let existingUser
    if (password !== repassword) {
        return res.status(404).json({message:'password no match'})
    }

    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        console.log(error)
    }

    if (existingUser) {
        return res.status(404).json({message:'user exist, go to login'})
    }

    const user = new User({
        firstname,
        lastname,
        email,
        password,
        repassword
    })

    try {
        await user.save()
    } catch (error) {
        console.log(error)
    }

    return res.status(401).json({user})
}


export const login = async (req, res, next) => {
    const {email, password} = req.body
    let data 
    let existingUser

    try {
        existingUser = await User.findOne({email})
    } catch (error) {
        console.log(error)
    }

    if (!existingUser) {
        return res.status(404).json({message:'email does not exist'})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(404).json({message:"password no match"})
    }

    // Generate JWT token
    const token = jwt.sign({userId : existingUser._id}, process.env.jwt_key)

    data = {
        id: existingUser._id, token
    }

    return res.status(200).json(data)
}