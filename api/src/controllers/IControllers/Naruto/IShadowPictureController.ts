import {NextFunction, Request, Response} from "express";

export default interface IShadowPictureController {
    uploadImage(req: Request, res: Response, next: NextFunction);
    getImageById(req: Request, res: Response, next: NextFunction);
    getImageByCharacterId(req: Request, res: Response, next: NextFunction);
    deleteImage(req: Request, res: Response, next: NextFunction);
}