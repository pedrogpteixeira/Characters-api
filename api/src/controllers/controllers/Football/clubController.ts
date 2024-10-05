import {Request, Response, NextFunction} from "express";
import {Inject, Service} from "typedi";
import config from "../../../../config";
import ILeagueService from "../../../services/IServices/Football/ILeagueService";
import ICountryService from "../../../services/IServices/World/ICountryService";
import IClubController from "../../IControllers/Football/IClubController";
import IClubService from "../../../services/IServices/Football/IClubService";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import IClubDTO from "../../../dto/football/IClubDTO";
import {Club} from "../../../domain/football/club";

@Service()
export default class ClubController implements IClubController {

    constructor(
        @Inject(config.services.football.league.name) private leagueServiceInstance: ILeagueService,
        @Inject(config.services.world.country.name) private countryServiceInstance: ICountryService,
        @Inject(config.services.football.club.name) private clubServiceInstance: IClubService
    ) {
    }

    public async getClubsByStadiumId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const result = await this.clubServiceInstance.findByStadiumId(req.params.id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasMoreThanXYearsOfFoundation(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const years_string = req.params.years;

            // Convert the string to a number
            const years = parseInt(years_string);

            if (isNaN(years)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findThatHasMoreThanXYearsOfFoundation(years);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasLessThanXYearsOfFoundation(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const years_string = req.params.years;

            // Convert the string to a number
            const years = parseInt(years_string);

            if (isNaN(years)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findThatHasLessThanXYearsOfFoundation(years);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasXYearsOfFoundation(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const years_string = req.params.years;

            // Convert the string to a number
            const years = parseInt(years_string);

            if (isNaN(years)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findThatHasXYearsOfFoundation(years);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async saveClub(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const clubDTO = req.body as IClubDTO;

            const league = await this.leagueServiceInstance.findById(clubDTO.leagueId);

            if (league.isFailure) {
                return res.status(404).json(league.errorValue());
            }

            const club = Club.create(clubDTO);
            if (club.isFailure) {
                return res.status(400).json({error: club.errorValue()});
            }

            const result = await this.clubServiceInstance.save(club.getValue());
            if (result.isFailure) {
                return res.status(400).json({error: result.errorValue()});
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.clubServiceInstance.findById(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubByName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const name = req.params.name;
            const result = await this.clubServiceInstance.findByName(name);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsByCountryId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const country = await this.countryServiceInstance.findById(req.params.id);
            if (country.isFailure) {
                return res.status(404).json(country.errorValue());
            }

            const leagues = await this.leagueServiceInstance.findByCountryId(country.getValue().id);
            if (leagues.isFailure) {
                return res.status(404).json(leagues.errorValue());
            }

            let clubs = [];
            for (const league of leagues.getValue()) {
                const result = await this.clubServiceInstance.findByLeagueId(league.id);
                if (result.isFailure) {
                    return res.status(404).json(result.errorValue());
                }
                clubs = clubs.concat(result.getValue());
            }

            return res.status(200).json(clubs);
        } catch (error) {
            next(error);
        }
    }

    public async getClubsByLeagueId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const league = await this.leagueServiceInstance.findById(req.params.id);
            if (league.isFailure) {
                return res.status(404).json(league.errorValue());
            }

            const result = await this.clubServiceInstance.findByLeagueId(req.params.id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasMinusThanXTrophies(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findThatHasMinusXTrophies(trophies);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasMoreThanXTrophies(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findThatHasMoreThanXTrophies(trophies);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasXTrophies(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findThatHasXTrophies(trophies);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasXTrophiesInCountry(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const country = await this.countryServiceInstance.findById(req.params.id);
            if (country.isFailure) {
                return res.status(404).json(country.errorValue());
            }

            const leagues = await this.leagueServiceInstance.findByCountryId(country.getValue().id);
            if (leagues.isFailure) {
                return res.status(404).json(leagues.errorValue());
            }

            let clubs = [];
            for (const league of leagues.getValue()) {
                const result = await this.clubServiceInstance.findByLeagueId(league.id);
                if (result.isFailure) {
                    return res.status(404).json(result.errorValue());
                }
                clubs = clubs.concat(result.getValue());
            }

            const result = clubs.filter((club) => club.trophies === trophies);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasMoreThanXTrophiesInCountry(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const country = await this.countryServiceInstance.findById(req.params.id);
            if (country.isFailure) {
                return res.status(404).json(country.errorValue());
            }

            const leagues = await this.leagueServiceInstance.findByCountryId(country.getValue().id);
            if (leagues.isFailure) {
                return res.status(404).json(leagues.errorValue());
            }

            let clubs = [];
            for (const league of leagues.getValue()) {
                const result = await this.clubServiceInstance.findByLeagueId(league.id);
                if (result.isFailure) {
                    return res.status(404).json(result.errorValue());
                }
                clubs = clubs.concat(result.getValue());
            }

            const result = clubs.filter((club) => club.trophies > trophies);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasMinusThanXTrophiesInCountry(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const country = await this.countryServiceInstance.findById(req.params.id);
            if (country.isFailure) {
                return res.status(404).json(country.errorValue());
            }

            const leagues = await this.leagueServiceInstance.findByCountryId(country.getValue().id);
            if (leagues.isFailure) {
                return res.status(404).json(leagues.errorValue());
            }

            let clubs = [];
            for (const league of leagues.getValue()) {
                const result = await this.clubServiceInstance.findByLeagueId(league.id);
                if (result.isFailure) {
                    return res.status(404).json(result.errorValue());
                }
                clubs = clubs.concat(result.getValue());
            }

            const result = clubs.filter((club) => club.trophies < trophies);

            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasXTrophiesInLeague(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findByLeagueId(req.params.id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const clubs = result.getValue();

            const result2 = clubs.filter((club) => club.trophies === trophies);

            return res.status(200).json(result2);
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasMoreThanXTrophiesInLeague(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findByLeagueId(req.params.id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const clubs = result.getValue();

            const result2 = clubs.filter((club) => club.trophies > trophies);

            return res.status(200).json(result2);
        } catch (error) {
            next(error);
        }
    }

    public async getClubsThatHasMinusThanXTrophiesInLeague(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const trophies_string = req.params.trophies;

            // Convert the string to a number
            const trophies = parseInt(trophies_string);

            if (isNaN(trophies)) {
                return res.status(400).json({error: "Invalid number"});
            }

            const result = await this.clubServiceInstance.findByLeagueId(req.params.id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            const clubs = result.getValue();

            const result2 = clubs.filter((club) => club.trophies < trophies);

            return res.status(200).json(result2);
        } catch (error) {
            next(error);
        }
    }

    public async getAllClubs(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const result = await this.clubServiceInstance.getAll();
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async deleteClub(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.clubServiceInstance.delete(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

}