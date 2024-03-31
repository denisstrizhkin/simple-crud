import { Request, Response } from "express";
import { Product } from "../models/ProductModel";
import { handleOK, handleServerError } from "../util";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({});
        handleOK(res, products);
    } catch (e) {
        handleServerError(res, e);
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        handleOK(res, product);
    } catch (e) {
        handleServerError(res, e);
    }
};
