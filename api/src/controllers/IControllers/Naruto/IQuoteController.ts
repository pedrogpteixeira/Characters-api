import {NextFunction, Request, Response} from "express";

export default interface IQuoteController {
    uploadQuote(req: Request, res: Response, next: NextFunction);
    getQuoteById(req: Request, res: Response, next: NextFunction);
    getQuotesByCharacterId(req: Request, res: Response, next: NextFunction);
    deleteQuote(req: Request, res: Response, next: NextFunction);
}