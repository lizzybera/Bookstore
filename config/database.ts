import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

// const url = "mongodb://localhost:27017/bookstore"

const database = async () =>{
    try {
        const db = await mongoose.connect(process.env.URL!)
    
        console.log(`Server is connected on ${db.connection.host}`);

    } catch (error) {
        console.log(error);
    }
    
}

export default database