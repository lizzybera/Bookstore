import { Request, Response } from "express"
import authModel from "../model/authModel"
import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const regUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body

        // image
        const initial = name.charAt(0).toUpperCase()

        // random token number
        let tokenString = crypto.randomBytes(10).toString('hex')

        // has password with bcrypt
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)


        const user = await authModel.create({
            name,
            email,
            password: hash,
            image: initial,
            verified: false,
            token: tokenString
        })

        // jwt
        const tokenID = jwt.sign({ userID: user?._id }, "Secret")
        // const tokenID = jwt.sign({ userID: user?._id }, "Secret", {expiresIn : "1m"})

        res.status(201).json({
            message: "User created sucessfully",
            data: user,
            tokenID
        })

    } catch (error) {
        res.status(404).json({
            message: "Error registering user",
            data: error
        })
    }
}

export const signInWithToken = async (req: Request, res: Response) => {
    try {
        const { token } = req.params

        const sign: any = jwt.verify(token, "Secret")

        const user = await authModel.findById(sign?.userID)

        if (user) {

            res.status(201).json({
                message: `Welcome ${user?.name}`,
            })

        } else {
            res.status(404).json({
                message: "User Not Found",
            })
        }

    } catch (error) {
        res.status(404).json({
            message: "Error logging user",
            data: error
        })
    }
}
export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await authModel.findOne({ email })

        if (user) {
            const checked = await bcrypt.compare(password, user?.password)

            if (checked) {
                res.status(201).json({
                    message: `Welcome ${user?.name}`,
                })
            } else {
                res.status(404).json({
                    message: "Password Incorrect",
                })
            }
        } else {
            res.status(404).json({
                message: "User Not Found",
            })
        }

        res.status(201).json({
            message: "User created sucessfully",
            data: user
        })

    } catch (error) {
        res.status(404).json({
            message: "Error logging user",
            data: error
        })
    }
}

// export const signIn = async (req: Request, res: Response) => {
//     try {
//         const { email, password } = req.body

//         const user = await authModel.findOne({ email })

//         if (user) {
//             if (user?.password === password) {
//                 res.status(201).json({
//                     message: `Welcome ${user?.name}`,
//                 })
//             } else {
//                 res.status(404).json({
//                     message: "Password Incorrect",
//                 })
//             }
//         } else {
//             res.status(404).json({
//                 message: "User Not Found",
//             })
//         }

//         res.status(201).json({
//             message: "User created sucessfully",
//             data: user
//         })

//     } catch (error) {
//         res.status(404).json({
//             message: "Error logging user",
//             data: error
//         })
//     }
// }