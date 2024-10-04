import {Result} from "../../../core/logic/Result";
import {Club} from "../../../domain/football/club";
import IClubDTO from "../../../dto/football/IClubDTO";

export default interface IClubService {
    save(club: Club): Promise<Result<IClubDTO>>;

    findById(leagueId: string): Promise<Result<IClubDTO>>;

    findByName(name: string): Promise<Result<IClubDTO>>;

    findByLeagueId(leagueId: string): Promise<Result<IClubDTO[]>>;

    findByStadiumId(stadiumId: string): Promise<Result<IClubDTO[]>>;

    findThatHasMinusXTrophies(x: number): Promise<Result<IClubDTO[]>>;

    findThatHasMoreThanXTrophies(x: number): Promise<Result<IClubDTO[]>>;

    findThatHasXTrophies(x: number): Promise<Result<IClubDTO[]>>;

    findThatHasXTrophiesInCountry(x: number, countryId: string): Promise<Result<IClubDTO[]>>;

    findThatHasMoreThanXTrophiesInCountry(x: number, countryId: string): Promise<Result<IClubDTO[]>>;

    findThatHasMinusThanXTrophiesInCountry(x: number, countryId: string): Promise<Result<IClubDTO[]>>;

    findThatHasXTrophiesInLeague(x: number, leagueId: string): Promise<Result<IClubDTO[]>>;

    findThatHasMoreThanXTrophiesInLeague(x: number, leagueId: string): Promise<Result<IClubDTO[]>>;

    findThatHasMinusThanXTrophiesInLeague(x: number, leagueId: string): Promise<Result<IClubDTO[]>>;

    findThatHasMoreThanXYearsOfFoundation(x: number): Promise<Result<IClubDTO[]>>;

    findThatHasLessThanXYearsOfFoundation(x: number): Promise<Result<IClubDTO[]>>;

    findThatHasXYearsOfFoundation(x: number): Promise<Result<IClubDTO[]>>;

    getAll(): Promise<Result<IClubDTO[]>>;

    delete(clubId: string): Promise<Result<IClubDTO>>;
}