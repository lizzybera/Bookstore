import { Router } from "express"
import { BuyBook, createBook, deleteBook, getBooks, updateBook, getUserBooks, updateBookImage } from "../controller/bookController"
import { upload } from "../config/multer"

const router = Router()

router.route("/").get(getBooks)
router.route("/create").post(createBook)
router.route("/update/:id").patch(updateBook)
router.route("/delete/:id").delete(deleteBook)
router.route("/buy/:userID/:bookID").post(BuyBook)
router.route("/user_books/:userID").get(getUserBooks)
router.route("/book_Image/:bookID").post(upload, updateBookImage)

export default router