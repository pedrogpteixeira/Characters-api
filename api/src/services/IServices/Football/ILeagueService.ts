import {Result} from "../../../core/logic/Result";
import {League} from "../../../domain/football/league";
import ILeagueDTO from "../../../dto/football/ILeagueDTO";

export default interface ILeagueService {
    save(league: League): Promise<Result<ILeagueDTO>>;

    findById(leagueId: string): Promise<Result<ILeagueDTO>>;

    findImageById(leagueId: string): Promise<Result<ILeagueDTO>>;

    findByName(name: string): Promise<Result<ILeagueDTO>>;

    findByCountryId(countryId: string): Promise<Result<ILeagueDTO[]>>;

    findThatHasMinusXTeams(x: number): Promise<Result<ILeagueDTO[]>>;

    findThatHasMoreThanXTeams(x: number): Promise<Result<ILeagueDTO[]>>;

    getAll(): Promise<Result<ILeagueDTO[]>>;

    delete(leagueId: string): Promise<Result<ILeagueDTO>>;
}