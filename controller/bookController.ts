import { Request, Response } from "express";
import model from "../model/bookModel"

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
        const {id} = req.params
        const {title} = req.body

        const book = await model.findByIdAndUpdate(id,{title}, {new : true})

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
        const {id} = req.params

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