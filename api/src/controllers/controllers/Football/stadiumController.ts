import {NextFunction, Request, Response} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import {Inject, Service} from "typedi";
import config from "../../../../config";
import ICountryService from "../../../services/IServices/World/ICountryService";
import IStadiumController from "../../IControllers/Football/IStadiumController";
import IStadiumDTO from "../../../dto/football/IStadiumDTO";
import {Stadium} from "../../../domain/football/stadium";
import IStadiumService from "../../../services/IServices/Football/IStadiumService";

@Service()
export default class StadiumController implements IStadiumController {

    constructor(
        @Inject(config.services.world.country.name) private countryServiceInstance: ICountryService,
        @Inject(config.services.football.stadium.name) private stadiumServiceInstance: IStadiumService
    ) {
    }

    public async saveStadium(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const stadiumDTO = req.body as IStadiumDTO;
            const country = await this.countryServiceInstance.findById(stadiumDTO.countryId);
            if (country.isFailure) {
                return res.status(404).json({message: country.errorValue()});
            }

            if (!req.file) {
                const stadium = Stadium.create(stadiumDTO);
                if (stadium.isFailure) {
                    return res.status(404).json({message: stadium.errorValue()});
                }

                const result = await this.stadiumServiceInstance.save(stadium.getValue());
                if (result.isFailure) {
                    return res.status(404).json({message: result.errorValue()});
                }

                return res.status(201).json(result.getValue());
            } else {
                const imgBuffer = req.file.buffer;
                stadiumDTO.image = imgBuffer.toString('base64');

                const stadium = Stadium.create(stadiumDTO);
                if (stadium.isFailure) {
                    return res.status(404).json({message: stadium.errorValue()});
                }

                const result = await this.stadiumServiceInstance.save(stadium.getValue());
                if (result.isFailure) {
                    return res.status(404).json({message: result.errorValue()});
                }

                return res.status(201).json(result.getValue());
            }
        } catch (e) {
            next(e);
        }
    }

    getStadiumById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumByName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumByLocation(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getClubsByCountryId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumsThatHasCapacityGreaterThan(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumsThatHasCapacityLessThan(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumsThatHasSurfaceType(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumsThatHasYearOpenedGreaterThan(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumsThatHasYearOpenedLessThan(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getStadiumsThatHasOpenedInYear(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    getAllStadiums(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

    deleteStadium(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        throw new Error("Method not implemented.");
    }

}