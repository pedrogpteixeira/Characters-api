import {Request, Response, NextFunction} from "express";
import INarutoService from "../../services/IServices/Naruto/INarutoService";
import {Inject, Service} from "typedi";
import config from "../../../config";
import IShadowPictureController from "../IControllers/Naruto/IShadowPictureController";
import IShadowPictureService from "../../services/IServices/Naruto/IShadowPictureService";
import IShadowPictureDTO from "../../dto/naruto/IShadowPictureDTO";
import {ShadowPicture} from "../../domain/naruto/shadowPicture";

@Service()
export default class ShadowPictureController implements IShadowPictureController {

    constructor(
        @Inject(config.services.naruto.naruto.name) private narutoServiceInstance: INarutoService,
        @Inject(config.services.naruto.shadowPicture.name) private shadowPictureServiceInstance: IShadowPictureService
    ) {
    }

    public async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                return res.status(400).send({error: 'No file uploaded'});
            }

            const imgBuffer = req.file.buffer;
            const imgBase64 = imgBuffer.toString('base64');

            const shadowDTO = {
                characterId: req.body.characterId,
                data: imgBase64
            } as IShadowPictureDTO;

            const shadowOrError = ShadowPicture.create(shadowDTO);

            if (shadowOrError.isFailure) {
                return res.status(404).json(shadowOrError.errorValue());
            }

            const shadow = shadowOrError.getValue();

            const characterResult = await this.narutoServiceInstance.findById(shadow.characterId);
            if (characterResult.isFailure) {
                return res.status(404).json(characterResult.errorValue());
            }

            const result = await this.shadowPictureServiceInstance.saveImage(shadow);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getImageById(req: Request, res: Response, next: NextFunction) {
        try {
            const shadowId = req.params.id;
            const result = await this.shadowPictureServiceInstance.findById(shadowId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const imgBuffer = Buffer.from(result.getValue().data.toString(), 'base64');

            res.writeHead(200, {
                'Content-Length': imgBuffer.length
            });
            return res.end(imgBuffer);
        } catch (error) {
            next(error);
        }
    }

    public async getImageByCharacterId(req: Request, res: Response, next: NextFunction) {
        try {
            const characterId = req.params.characterId;
            const result = await this.shadowPictureServiceInstance.findByCharacterId(characterId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const imgBuffer = Buffer.from(result.getValue().data.toString(), 'base64');

            res.writeHead(200, {
                'Content-Length': imgBuffer.length
            });
            return res.end(imgBuffer);
        } catch (error) {
            next(error);
        }
    }

    public async deleteImage(req: Request, res: Response, next: NextFunction) {
        try {
            const shadowId = req.params.id;
            const result = await this.shadowPictureServiceInstance.deleteImage(shadowId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

}