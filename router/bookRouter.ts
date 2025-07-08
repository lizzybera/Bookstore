import { Router } from "express"
import { createBook, deleteBook, getBooks, updateBook } from "../controller/bookController"

const router = Router()

router.route("/").get(getBooks)
router .route("/create").post(createBook)
router.route("/update/:id").patch(updateBook)
router.route("/delete/:id").delete(deleteBook)

export default router