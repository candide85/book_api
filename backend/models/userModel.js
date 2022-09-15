import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    repassword: {
        type: String,
        required: true,
        minlength: 6
    }
})

userSchema.pre('save', async function (next) {
    try {
        const saltRound = 10
        const hash = await bcrypt.hash(this.password, saltRound)
        this.password = hash
        this.repassword = hash
        next()
    } catch (error) {
        console.log(error)
    }
})

export default mongoose.model('User', userSchema)