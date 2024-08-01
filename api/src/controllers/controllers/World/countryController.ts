import {Inject, Service} from "typedi";
import config from "../../../../config";
import IContinentService from "../../../services/IServices/World/IContinentService";
import ICountryController from "../../IControllers/World/ICountryController";
import ICountryService from "../../../services/IServices/World/ICountryService";
import {Request, Response, NextFunction} from "express";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import ICountryDTO from "../../../dto/world/ICountryDTO";
import {Country} from "../../../domain/world/country";

@Service()
export default class CountryController implements ICountryController {

    constructor(
        @Inject(config.services.world.continent.name) private continentServiceInstance: IContinentService,
        @Inject(config.services.world.country.name) private countryServiceInstance: ICountryService
    ) {
    }

    public async saveCountry(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const countryDTO = req.body as ICountryDTO;

            const continent = await this.continentServiceInstance.findById(countryDTO.continentId);
            if (continent.isFailure) {
                return res.status(400).json(continent.errorValue());
            }

            const country = Country.create(countryDTO);
            if (country.isFailure) {
                return res.status(400).json(country.errorValue());
            }
            const result = await this.countryServiceInstance.save(country.getValue());
            if (result.isFailure) {
                return res.status(400).json(result.errorValue());
            }
            return res.status(201).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async getCountryById(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.countryServiceInstance.findById(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async getCountryByName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const name = req.params.name;
            const result = await this.countryServiceInstance.findByName(name);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (e) {
            next(e);
        }
    }

    public async getAllCountries(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const result = await this.countryServiceInstance.getAll();
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getCountriesByContinentId(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const continentId = req.params.continentId;
            const result = await this.countryServiceInstance.findByContinent(continentId);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getCountriesByContinentName(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const continentName = req.params.name;
            const result = await this.continentServiceInstance.findByName(continentName);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            const continent = result.getValue();
            const resultCountries = await this.countryServiceInstance.findByContinent(continent.id.toString());
            if (resultCountries.isFailure) {
                return res.status(404).json(resultCountries.errorValue());
            }
            return res.status(200).json(resultCountries.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async deleteCountry(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) {
        try {
            const id = req.params.id;
            const result = await this.countryServiceInstance.deleteCountry(id);
            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }
            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

}