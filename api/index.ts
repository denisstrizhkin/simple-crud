import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { getProduct, getProducts } from "./products/productGet";
import { postProduct } from "./products/productPost";
import { deleteProduct } from "./products/productDelete";
import { putProduct } from "./products/productPut";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 80;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;

app.get("/products", getProducts);
app.get("/products/:id", getProduct);
app.post("/products", postProduct);
app.put("/products/:id", putProduct);
app.delete("/products/:id", deleteProduct);

const start = async () => {
    try {
        const mongoStr = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
        await mongoose.connect(mongoStr);
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();
