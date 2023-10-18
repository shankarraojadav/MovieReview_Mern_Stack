import mongoose from "mongoose";

const Connection = () => {
    const url = process.env.Mongo_Url;
    try {
        mongoose.connect(url);
        console.log("db connected successfully");
    } catch (error) {
        console.log("error while connecting to db", error)
    }
}


export default Connection;