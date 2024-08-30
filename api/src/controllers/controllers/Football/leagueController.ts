import {Request, Response, NextFunction} from "express";
import {Inject, Service} from "typedi";
import config from "../../../../config";
import ILeagueController from "../../IControllers/Football/ILeagueController";
import ILeagueService from "../../../services/IServices/Football/ILeagueService";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";

@Service()
export default class LeagueController implements ILeagueController {

    constructor(
        @Inject(config.services.football.league.name) private leagueServiceInstance: ILeagueService
    ) {
    }

    getLeagueById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getLeagueByName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getLeagueByCountry(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getLeagueThatHasMinusXTeams(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getLeagueThatHasMoreThanXTeams(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    deleteLeague(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    public async getAllLeagues(req: Request, res: Response, next: NextFunction) {
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

    public async saveLeague(req: Request, res: Response, next: NextFunction) {
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

}