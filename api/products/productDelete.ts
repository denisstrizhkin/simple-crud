import { Request, Response } from "express";
import { Product } from "../models/ProductModel";
import { handleNotFound, handleOK, handleServerError } from "../util";

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return handleNotFound(res, id);
        }
        handleOK(res, product);
    } catch (e) {
        handleServerError(res, e);
    }
};
