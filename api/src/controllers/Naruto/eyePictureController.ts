import {Request, Response, NextFunction} from "express";
import INarutoService from "../../services/IServices/Naruto/INarutoService";
import {Inject, Service} from "typedi";
import config from "../../../config";
import IEyePictureController from "../IControllers/Naruto/IEyePictureController";
import IEyePictureService from "../../services/IServices/Naruto/IEyePictureService";
import IEyePictureDTO from "../../dto/naruto/IEyePictureDTO";
import {EyePicture} from "../../domain/naruto/eyePicture";

@Service()
export default class EyePictureController implements IEyePictureController {

    constructor(
        @Inject(config.services.naruto.naruto.name) private narutoServiceInstance: INarutoService,
        @Inject(config.services.naruto.eyePicture.name) private eyePictureServiceInstance: IEyePictureService
    ) {
    }

    public async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                return res.status(400).send({error: 'No file uploaded'});
            }

            const imgBuffer = req.file.buffer;
            const imgBase64 = imgBuffer.toString('base64');

            const eyeDTO = {
                characterId: req.body.characterId,
                data: imgBase64
            } as IEyePictureDTO;

            const eyeOrError = EyePicture.create(eyeDTO);

            if (eyeOrError.isFailure) {
                return res.status(404).json(eyeOrError.errorValue());
            }

            const eye = eyeOrError.getValue();

            const characterResult = await this.narutoServiceInstance.findById(eye.characterId);
            if (characterResult.isFailure) {
                return res.status(404).json(characterResult.errorValue());
            }

            const result = await this.eyePictureServiceInstance.saveImage(eye);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }

    public async getImageById(req: Request, res: Response, next: NextFunction) {
        try {
            const eyeId = req.params.id;

            const result = await this.eyePictureServiceInstance.findById(eyeId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const imgBuffer = Buffer.from(result.getValue().data.toString(), 'base64');

            res.writeHead(200, {
                'Content-Length': imgBuffer.length
            });
            return res.end(imgBuffer);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }

    public async getImageByCharacterId(req: Request, res: Response, next: NextFunction) {
        try {
            const characterId = req.params.characterId;

            const result = await this.eyePictureServiceInstance.findByCharacterId(characterId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const imgBuffer = Buffer.from(result.getValue().data.toString(), 'base64');

            res.writeHead(200, {
                'Content-Length': imgBuffer.length
            });
            return res.end(imgBuffer);
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }

    public async deleteImage(req: Request, res: Response, next: NextFunction) {
        try {
            const eyeId = req.params.id;

            const result = await this.eyePictureServiceInstance.deleteImage(eyeId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }

}