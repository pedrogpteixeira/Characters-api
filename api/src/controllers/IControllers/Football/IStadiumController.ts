import {NextFunction, Request, Response} from "express";

export default interface IStadiumController {
    saveStadium(req: Request, res: Response, next: NextFunction);

    getStadiumById(req: Request, res: Response, next: NextFunction);

    getStadiumByName(req: Request, res: Response, next: NextFunction);

    getStadiumByLocation(req: Request, res: Response, next: NextFunction);

    getClubsByCountryId(req: Request, res: Response, next: NextFunction);

    getStadiumsThatHasCapacityGreaterThan(req: Request, res: Response, next: NextFunction);

    getStadiumsThatHasCapacityLessThan(req: Request, res: Response, next: NextFunction);

    getStadiumsThatHasSurfaceType(req: Request, res: Response, next: NextFunction);

    getStadiumsThatHasYearOpenedGreaterThan(req: Request, res: Response, next: NextFunction);

    getStadiumsThatHasYearOpenedLessThan(req: Request, res: Response, next: NextFunction);

    getStadiumsThatHasOpenedInYear(req: Request, res: Response, next: NextFunction);

    getAllStadiums(req: Request, res: Response, next: NextFunction);

    deleteStadium(req: Request, res: Response, next: NextFunction);

}