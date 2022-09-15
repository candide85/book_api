import express from 'express'
import dotenv from 'dotenv'
import database from './database_conn'
import userRouter from './routes/userRoute'

dotenv.config()
database.connect()
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", userRouter)

const port = 5000
const port1 = process.env.PORT || port

app.listen(process.env.PORT || port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port1}` )
})
