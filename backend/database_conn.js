import mongoose from 'mongoose'

const connect = () => {
    mongoose.connect(process.env.MONGO_DB_CONNECT)
    .then(() => {
        console.log('Database connected!!!')
    })
    .catch((err) => {
        console.log('Failed to connect to database', err)
    })
}

export default {connect}