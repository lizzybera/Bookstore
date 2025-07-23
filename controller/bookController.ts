import { Request, Response } from "express";
import model from "../model/bookModel"
import authModel from "../model/authModel";
import cloudinary from "../config/cloudinary";

export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, authorName, details, ISBN, price, image } = req.body

        const book = await model.create({ title, authorName, details, ISBN, price, image })

        res.status(201).json({
            message: "Book created successfully",
            data: book
        })

    } catch (error) {
        res.status(404).json({
            message: "Error creating Book!!",
            data: error
        })
    }
}

export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await model.find()

        res.status(200).json({
            message: "Books gotten successfully",
            data: books
        })

    } catch (error) {
        res.status(404).json({
            message: "Error getting Books!!",
            data: error
        })
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title } = req.body

        const book = await model.findByIdAndUpdate(id, { title }, { new: true })

        res.status(200).json({
            message: "Book updated successfully",
            data: book
        })

    } catch (error) {
        res.status(404).json({
            message: "Error Updating Book!!",
            data: error
        })
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const book = await model.findByIdAndDelete(id)

        res.status(200).json({
            message: `${book?.title} deleted successfully`,
        })

    } catch (error) {
        res.status(404).json({
            message: "Error Deleting Book!!",
            data: error
        })
    }
}

export const BuyBook = async (req: Request, res: Response) => {
    try {
        const { userID, bookID } = req.params

        const book : any = await model.findById(bookID)        
        
        if (book) {
            const user = await authModel.findById(userID)

            if (user) {
                user.book.push(book._id)
                user.save()
                
                res.status(201).json({
                message: "Book Bought Sucessfully!!",
                data : user
            })
            } else {
                res.status(404).json({
                message: "User Not Found!!",
            })
            }
            console.log("welcome");
            

        } else {
            res.status(404).json({
                message: "Book Not Found!!",
            })
        }


    } catch (error) {
        res.status(404).json({
            message: "Error Buying Book!!",
            data: error
        })
    }
}

export const getUserBooks = async (req: Request, res: Response) => {
    try {
        const { userID } = req.params

        const books = await authModel.findById(userID).populate({
            path : "book",
            options : {
                sort : {
                    createdAt: -1
                }
            }
        })

         res.status(200).json({
            message: "User Books Gotten Successfully!!",
            data: books
        })


    } catch (error) {
        res.status(404).json({
            message: "Error Getting USer Book!!",
            data: error
        })
    }
}

export const updateBookImage = async (req: any, res: Response) => {
    try {
        const { bookID } = req.params

        const book = await model.findById(bookID)

        if(book){
            const {secure_url} = await cloudinary.uploader.upload(req.file?.path)

            const updateImage = await model.findByIdAndUpdate(bookID, {image : secure_url},  {new : true})

            res.status(201).json({
                message : "Image Updated Succcessfully",
                data : updateImage
            })
        }else{
            res.status(404).json({
            message: "Error Finding Book!!",
        })
        }

    } catch (error) {
        res.status(404).json({
            message: "Error Updating Book Image!!",
            data: error
        })
    }
}