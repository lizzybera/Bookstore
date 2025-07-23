import mongoose, { Schema } from "mongoose";

interface iAuth {
    name : string;
    email : string;
    password : string;
    image : string;
    verified : boolean;
    token : string;
    book: {}[];
}

interface iAuthData extends iAuth, mongoose.Document{}

const authModel = new Schema<iAuthData>({
    name : {
        type : String
    },
    email : {
        type : String,
        required : [true, "Please input email"],
        unique : true
    },
    password : {
        type : String
    },
    image : {
        type : String
    },
    verified : {
        type : Boolean
    },
    token : {
        type : String
    },
    book:[{
        type: mongoose.Types.ObjectId,
        ref:"books"
    }]
}, {timestamps: true})

export default mongoose.model<iAuthData>("users", authModel)