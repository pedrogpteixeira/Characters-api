import {Request, Response, NextFunction} from "express";
import {Inject, Service} from "typedi";
import config from "../../../../config";
import IContinentController from "../../IControllers/World/IContinentController";
import IContinentService from "../../../services/IServices/World/IContinentService";
import IContinentDTO from "../../../dto/world/IContinentDTO";
import {Continent} from "../../../domain/world/continent";

@Service()
export default class ContinentController implements IContinentController {

    constructor(
        @Inject(config.services.world.continent.name) private continentServiceInstance: IContinentService
    ) {
    }

    public async getAllContinents(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.continentServiceInstance.getAll();
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async saveContinent(req: Request, res: Response, next: NextFunction) {
        try {
            const continentDTO = req.body as IContinentDTO;
            const continent = Continent.create(continentDTO);
            if (continent.isFailure) {
                return res.status(400).json(continent.errorValue());
            }
            const result = await this.continentServiceInstance.save(continent.getValue());
            if (result.isFailure) {
                return res.status(400).json(result.errorValue());
            }
            return res.status(201).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async getContinentById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.continentServiceInstance.findById(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async getContinentByName(req: Request, res: Response, next: NextFunction) {
        try {
            const name = req.params.name;
            const result = await this.continentServiceInstance.findByName(name);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async deleteContinent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.continentServiceInstance.deleteContinent(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

}