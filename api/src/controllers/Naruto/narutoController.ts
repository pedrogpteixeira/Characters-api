import {Request, Response, NextFunction} from "express";
import INarutoController from "../IControllers/Naruto/INarutoController";
import INarutoService from "../../services/IServices/Naruto/INarutoService";
import {Inject, Service} from "typedi";
import config from "../../../config";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import INarutoDTO from "../../dto/naruto/INarutoDTO";

@Service()
export default class NarutoController implements INarutoController {

    constructor(
        @Inject(config.services.naruto.naruto.name) private narutoServiceInstance: INarutoService,
    ) {
    }

    public async updateCharacter(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const naruto = req.body as INarutoDTO;

            const result = await this.narutoServiceInstance.updateCharacter(id, naruto);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getCharacterById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const result = await this.narutoServiceInstance.findById(id);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getAllCharacters(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.narutoServiceInstance.findAll();

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getCharacterByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.params.name;

            const result = await this.narutoServiceInstance.findByName(name);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async deleteCharacter(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;

            const result = await this.narutoServiceInstance.deleteById(id);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async saveCharacter(req: Request, res: Response, next: NextFunction) {
        try {
            const naruto = req.body;
            const result = await this.narutoServiceInstance.saveCharacter(naruto);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

}