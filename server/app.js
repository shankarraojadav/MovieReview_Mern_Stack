import express from "express";
import bodyParser from "body-parser";
import cors  from "cors";
import dotenv from "dotenv";
import Connection from "./connection.js";
import UserRoutes from './routes/user.js';
import cookieParser from "cookie-parser";
import ActorRoutes from "./routes/actors.js";
import MovieRoutes from "./routes/movie.js";

const port = process.env.Port || 3000;

dotenv.config();
const app = express();


app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use("", UserRoutes);
app.use("/actor", ActorRoutes);
app.use("/movie", MovieRoutes);

app.listen(port, () => {
    console.log("server started")
})

Connection();