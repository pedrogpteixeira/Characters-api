import {NextFunction, Request, Response} from "express";

export default interface ICountryController {
    saveCountry(req: Request, res: Response, next: NextFunction);

    getCountryById(req: Request, res: Response, next: NextFunction);

    getCountryByName(req: Request, res: Response, next: NextFunction);

    getAllCountries(req: Request, res: Response, next: NextFunction);

    getCountriesByContinentId(req: Request, res: Response, next: NextFunction);

    getCountriesByContinentName(req: Request, res: Response, next: NextFunction);

    deleteCountry(req: Request, res: Response, next: NextFunction);
}