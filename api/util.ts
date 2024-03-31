import { Response } from "express";

export const handleOK = (res: Response, data: any) => {
    res.status(200).json({ message: "ok", data: data });
};

export const handleServerError = (res: Response, e: any) => {
    const error = e as Error;
    console.log(error.message);
    res.status(500).json({ message: error.message });
};

export const handleNotFound = (res: Response, id: string) => {
    res.status(404).json({ message: `Can't find any product with ID ${id}` });
};
