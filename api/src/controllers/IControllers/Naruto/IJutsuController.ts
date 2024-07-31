import {NextFunction, Request, Response} from "express";

export default interface IJutsuController {
    uploadVideo(req: Request, res: Response, next: NextFunction);
    getVideoById(req: Request, res: Response, next: NextFunction);
    getVideoByName(req: Request, res: Response, next: NextFunction);
    getJutsusByCharacterId(req: Request, res: Response, next: NextFunction);
    deleteVideo(req: Request, res: Response, next: NextFunction);
}