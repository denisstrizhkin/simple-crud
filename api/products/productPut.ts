import { Request, Response } from "express";
import { Product } from "../models/ProductModel";
import { handleNotFound, handleOK, handleServerError } from "../util";

export const putProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return handleNotFound(res, id);
        }
        const updatedProduct = await Product.findById(id);
        handleOK(res, updatedProduct);
    } catch (e) {
        handleServerError(res, e);
    }
};
