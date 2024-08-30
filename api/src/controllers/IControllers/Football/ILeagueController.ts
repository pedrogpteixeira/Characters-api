import {NextFunction, Request, Response} from "express";

export default interface ILeagueController {
    saveLeague(req: Request, res: Response, next: NextFunction);

    getLeagueById(req: Request, res: Response, next: NextFunction);

    getLeagueByName(req: Request, res: Response, next: NextFunction);

    getLeagueByCountry(req: Request, res: Response, next: NextFunction);

    getLeagueThatHasMinusXTeams(req: Request, res: Response, next: NextFunction);

    getLeagueThatHasMoreThanXTeams(req: Request, res: Response, next: NextFunction);

    getAllLeagues(req: Request, res: Response, next: NextFunction);

    deleteLeague(req: Request, res: Response, next: NextFunction);
}