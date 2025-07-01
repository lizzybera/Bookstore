import { Request, Response } from "express";
import model from "../model/bookModel"

export const createBook = async (req : Request, res : Response) =>{
    try {
        const {title, authorName, details, ISBN, price, image} = req.body

        const book = await model.create({title, authorName, details, ISBN, price, image})

        return res.status(201).json({
            message : "Book created successfully",
            data : book
        })
        
    } catch (error) {
        return res.status(404).json({
            message : "Error creating Book!!",
            data : error
        })
    }
}


export const getBooks = async (req : Request, res : Response) => {
    try {
        const books = await model.find()

        return res.status(200).json({
            message : "Books gotten successfully",
            data : books
        })

    } catch (error) {
        return res.status(404).json({
            message : "Error getting Books!!",
            data : error
        })
    }
}