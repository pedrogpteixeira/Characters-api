import {Request, Response, NextFunction} from "express";
import {Inject, Service} from "typedi";
import config from "../../../../config";
import ILeagueController from "../../IControllers/Football/ILeagueController";
import ILeagueService from "../../../services/IServices/Football/ILeagueService";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import ILeagueDTO from "../../../dto/football/ILeagueDTO";
import {League} from "../../../domain/football/league";
import ICountryService from "../../../services/IServices/World/ICountryService";

@Service()
export default class LeagueController implements ILeagueController {

    constructor(
        @Inject(config.services.football.league.name) private leagueServiceInstance: ILeagueService,
        @Inject(config.services.world.country.name) private countryServiceInstance: ICountryService
    ) {
    }

    public async getLeagueImageById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.leagueServiceInstance.findImageById(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const imgBuffer = Buffer.from(result.getValue().image.toString(), 'base64');

            res.writeHead(200, {
                'Content-Length': imgBuffer.length
            });
            return res.end(imgBuffer);
        } catch (error) {
            next(error);
        }
    }

    public async getLeagueById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.leagueServiceInstance.findById(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getLeagueByName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const name = req.params.name;
            const result = await this.leagueServiceInstance.findByName(name);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getLeagueByCountry(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const country = req.params.countryId;
            const result = await this.leagueServiceInstance.findByCountryId(country);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getLeagueThatHasMinusXTeams(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const teams_string = req.params.teams;

            // Convert the string to a number
            const teams = parseInt(teams_string);

            if (isNaN(teams)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.leagueServiceInstance.findThatHasMinusXTeams(teams);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getLeagueThatHasMoreThanXTeams(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const teams_string = req.params.teams;

            // Convert the string to a number
            const teams = parseInt(teams_string);

            if (isNaN(teams)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.leagueServiceInstance.findThatHasMoreThanXTeams(teams);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async deleteLeague(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.leagueServiceInstance.delete(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getAllLeagues(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.leagueServiceInstance.getAll();
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
            const leagueDTO = req.body as ILeagueDTO;

            const country = await this.countryServiceInstance.findById(leagueDTO.countryId);

            if (country.isFailure) {
                return res.status(400).json(country.errorValue());
            }

            let imgBuffer: Buffer;
            let imgBase64: string;

            if (req.file) {
                imgBuffer = req.file.buffer;
                imgBase64 = imgBuffer.toString('base64');
                leagueDTO.image = imgBase64;
            }

            const league = League.create(leagueDTO);
            if (league.isFailure) {
                return res.status(400).json(league.errorValue());
            }
            const result = await this.leagueServiceInstance.save(league.getValue());
            if (result.isFailure) {
                return res.status(400).json(result.errorValue());
            }
            return res.status(201).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

}