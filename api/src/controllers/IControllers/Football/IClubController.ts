import {NextFunction, Request, Response} from "express";

export default interface IClubController {
    saveClub(req: Request, res: Response, next: NextFunction);

    getClubById(req: Request, res: Response, next: NextFunction);

    getClubByName(req: Request, res: Response, next: NextFunction);

    getClubsByCountryId(req: Request, res: Response, next: NextFunction);

    getClubsByLeagueId(req: Request, res: Response, next: NextFunction);

    getClubsThatHasMinusThanXTrophies(req: Request, res: Response, next: NextFunction);

    getClubsThatHasMoreThanXTrophies(req: Request, res: Response, next: NextFunction);

    getClubsThatHasXTrophies(req: Request, res: Response, next: NextFunction);

    getClubsThatHasXTrophiesInCountry(req: Request, res: Response, next: NextFunction);

    getClubsThatHasMoreThanXTrophiesInCountry(req: Request, res: Response, next: NextFunction);

    getClubsThatHasMinusThanXTrophiesInCountry(req: Request, res: Response, next: NextFunction);

    getClubsThatHasXTrophiesInLeague(req: Request, res: Response, next: NextFunction);

    getClubsThatHasMoreThanXTrophiesInLeague(req: Request, res: Response, next: NextFunction);

    getClubsThatHasMinusThanXTrophiesInLeague(req: Request, res: Response, next: NextFunction);

    getClubsByStadiumId(req: Request, res: Response, next: NextFunction);

    getClubsThatHasMoreThanXYearsOfFoundation(req: Request, res: Response, next: NextFunction);

    getClubsThatHasLessThanXYearsOfFoundation(req: Request, res: Response, next: NextFunction);

    getClubsThatHasXYearsOfFoundation(req: Request, res: Response, next: NextFunction);

    getAllClubs(req: Request, res: Response, next: NextFunction);

    deleteClub(req: Request, res: Response, next: NextFunction);
}