import {NextFunction, Request, Response} from "express";

export default interface IContinentController {
    saveContinent(req: Request, res: Response, next: NextFunction);

    getContinentById(req: Request, res: Response, next: NextFunction);

    getContinentByName(req: Request, res: Response, next: NextFunction);

    getAllContinents(req: Request, res: Response, next: NextFunction);

    deleteContinent(req: Request, res: Response, next: NextFunction);
}