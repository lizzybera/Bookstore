import express from "express"
import { regUser, signIn } from "../controller/authController"

const router = express.Router()

router.route("/reg").post(regUser)
router.route("/sign-in").post(signIn)

export default router