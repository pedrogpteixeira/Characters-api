import {Request, Response, NextFunction} from "express";
import INarutoService from "../../services/IServices/Naruto/INarutoService";
import {Inject, Service} from "typedi";
import config from "../../../config";
import IImageService from "../../services/IServices/Naruto/IImageService";
import IImageDTO from "../../dto/naruto/IImageDTO";
import {Image} from "../../domain/naruto/image";
import IImageController from "../IControllers/Naruto/IImageController";

@Service()
export default class ImageController implements IImageController {

    constructor(
        @Inject(config.services.naruto.naruto.name) private narutoServiceInstance: INarutoService,
        @Inject(config.services.naruto.image.name) private imageServiceInstance: IImageService
    ) {
    }

    public async getImageByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.params.name;
            const result = await this.imageServiceInstance.findByName(name);

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

    public async getImageById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.imageServiceInstance.findById(id);

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
            const result = await this.imageServiceInstance.findByCharacterId(characterId);

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
            const id = req.params.id;
            const result = await this.imageServiceInstance.deleteImage(id);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                return res.status(400).send({error: 'No file uploaded'});
            }

            const imgBuffer = req.file.buffer;
            const imgBase64 = imgBuffer.toString('base64');

            const imageDTO = {
                name: req.body.name,
                characterId: req.body.characterId,
                data: imgBase64
            } as IImageDTO;

            const imageOrError = Image.create(imageDTO);

            if (imageOrError.isFailure) {
                return res.status(404).json(imageOrError.errorValue());
            }

            const image = imageOrError.getValue();

            const nameExists = await this.imageServiceInstance.findByName(image.name);
            if (nameExists.isSuccess) {
                return res.status(404).json("Image name already exists");
            }

            const characterResult = await this.narutoServiceInstance.findById(image.characterId);
            if (characterResult.isFailure) {
                return res.status(404).json(characterResult.errorValue());
            }
            //TODO: Check if character exists from other franchises

            const result = await this.imageServiceInstance.saveImage(image);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

}