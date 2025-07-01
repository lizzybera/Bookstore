import mongoose from "mongoose";

interface iBooks {
    title? : string;
    authorName? : string;
    details? : string;
    ISBN? : string;
    image? : string;
    price? : number;
}

interface iBookData extends iBooks, mongoose.Document{}

const bookModel = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Please input Book title"],
        unique : true
    },
    authorName : {
        type : String
    },
    details : {
        type : String
    },
    ISBN : {
        type : String
    },
    image : {
        type : String
    },
    price : {
        type : Number
    },
})

export default mongoose.model<iBookData>("books", bookModel)