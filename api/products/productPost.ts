import { Request, Response } from "express";
import { Product } from "../models/ProductModel";
import { handleOK, handleServerError } from "../util";

export const postProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        handleOK(res, product);
    } catch (e) {
        handleServerError(res, e);
    }
};
