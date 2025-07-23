import express from "express"
import { regUser, signIn,signInWithToken } from "../controller/authController"

const router = express.Router()

router.route("/reg").post(regUser)
router.route("/sign-in").post(signIn)
router.route("/sign-in-token/:token").post(signInWithToken)

export default router