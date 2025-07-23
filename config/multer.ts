import multer from "multer"

const storage = multer.diskStorage({
    destination : (req : any, file : any, cb: any) => {
        cb(null, "uploads")
    },

    filename : (req : any, file : any, cb: any) => {
        const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1E9)

        cb(null, file.filename + uniqueSuffix + ".jpg")
    }
})

export const upload = multer({storage : storage}).single("avatar")