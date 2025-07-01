import express, { Application, Request, Response } from "express"
import database from "./config/database"
import bookRouter from "./router/bookRouter"

const port : number = 2000

const app : Application = express()

database()
app.use(express.json())
app.use("/book", bookRouter)

app.get("/", (req: Request, res : Response) =>{
    try {

        res.status(200).json({
            message : 'Welcome to our bookstore'
        })
        
    } catch (error) {
        res.status(404).json({
            message : "Error was found"
        })
    }
})

app.listen(port, () =>{
    console.log("Server is listening");
})