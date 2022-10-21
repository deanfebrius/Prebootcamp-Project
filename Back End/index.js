import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./database/index.js";
import router from "./routers/index.js";
import FileUpload from "express-fileupload";
import postRouters from "./routers/postRouters.js";
import profileRouters from "./routers/profileRouters.js";

dotenv.config();
const app = express();

try {
    await db.authenticate();
    console.log(`Database connected!`)
} catch(error) {
    console.error(error)
}

app.use(cors({ credentials:true, origin:"http://localhost:3000" }))
app.use(cookieParser())
app.use(express.json())
app.use(router);
app.use(FileUpload())
app.use(express.static("public"));
app.use(postRouters)
app.use(profileRouters)

const PORT = 3300;

app.listen(PORT, ()=> console.log(`Server Running at PORT:`, PORT))