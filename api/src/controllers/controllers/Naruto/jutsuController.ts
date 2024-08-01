import {Request, Response, NextFunction} from "express";
import INarutoService from "../../../services/IServices/Naruto/INarutoService";
import {Inject, Service} from "typedi";
import config from "../../../../config";
import IJutsuController from "../../IControllers/Naruto/IJutsuController";
import IJutsuService from "../../../services/IServices/Naruto/IJutsuService";
import {Jutsu} from "../../../domain/naruto/jutsu";
import IJutsuDTO from "../../../dto/naruto/IJutsuDTO";

@Service()
export default class JutsuController implements IJutsuController {

    constructor(
        @Inject(config.services.naruto.naruto.name) private narutoServiceInstance: INarutoService,
        @Inject(config.services.naruto.jutsu.name) private jutsuServiceInstance: IJutsuService
    ) {
    }

    public async uploadVideo(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.file) {
                return res.status(400).send({error: 'No file uploaded'});
            }

            const imgBuffer = req.file.buffer;
            const imgBase64 = imgBuffer.toString('base64');

            const jutsuDTO = {
                name: req.body.name,
                characterId: req.body.characterId,
                data: imgBase64
            } as IJutsuDTO;

            const jutsuOrError = Jutsu.create(jutsuDTO);

            if (jutsuOrError.isFailure) {
                return res.status(404).json(jutsuOrError.errorValue());
            }

            const jutsu = jutsuOrError.getValue();

            const characterResult = await this.narutoServiceInstance.findById(jutsu.characterId);
            if (characterResult.isFailure) {
                return res.status(404).json(characterResult.errorValue());
            }

            const result = await this.jutsuServiceInstance.saveVideo(jutsu);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error)
        }
    }

    public async getVideoById(req: Request, res: Response, next: NextFunction) {
        try {
            const shadowId = req.params.id;
            const result = await this.jutsuServiceInstance.findById(shadowId);

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

    public async getVideoByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.params.name;
            const result = await this.jutsuServiceInstance.findByName(name);

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

    public async getJutsusByCharacterId(req: Request, res: Response, next: NextFunction) {
        try {
            const characterId = req.params.characterId;
            const result = await this.jutsuServiceInstance.findByCharacterId(characterId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const jutsus = result.getValue();

            return res.status(200).json(jutsus);
        } catch (error) {
            next(error);
        }
    }

    public async deleteVideo(req: Request, res: Response, next: NextFunction) {
        try {
            const videoId = req.params.id;
            const result = await this.jutsuServiceInstance.deleteVideo(videoId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

}