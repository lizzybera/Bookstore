import { Router } from "express"
import { createBook, getBooks } from "../controller/bookController"

const router = Router()

router.route("/").get(getBooks)
router .route("/create").post(createBook)

export default router