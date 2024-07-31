import {NextFunction, Request, Response} from "express";

export default interface INarutoController {
    saveCharacter(req: Request, res: Response, next: NextFunction);
    getCharacterById(req: Request, res: Response, next: NextFunction);
    getAllCharacters(req: Request, res: Response, next: NextFunction);
    getCharacterByName(req: Request, res: Response, next: NextFunction);
    updateCharacter(req: Request, res: Response, next: NextFunction);
    deleteCharacter(req: Request, res: Response, next: NextFunction);
}