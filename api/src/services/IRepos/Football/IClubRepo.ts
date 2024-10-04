import {Club} from "../../../domain/football/club";

export default interface IClubRepo {
    save(club: Club): Promise<Club>;

    findById(id: string): Promise<Club>;

    findByName(name: string): Promise<Club>;

    findByLeagueId(leagueId: string): Promise<Club[]>;

    findByStadiumId(stadiumId: string): Promise<Club[]>;

    findThatHasMinusXTrophies(x: number): Promise<Club[]>;

    findThatHasMoreThanXTrophies(x: number): Promise<Club[]>;

    findThatHasXTrophies(x: number): Promise<Club[]>;

    findThatHasXTrophiesInCountry(x: number, countryId: string): Promise<Club[]>;

    findThatHasMoreThanXTrophiesInCountry(x: number, countryId: string): Promise<Club[]>;

    findThatHasMinusThanXTrophiesInCountry(x: number, countryId: string): Promise<Club[]>;

    findThatHasXTrophiesInLeague(x: number, leagueId: string): Promise<Club[]>;

    findThatHasMoreThanXTrophiesInLeague(x: number, leagueId: string): Promise<Club[]>;

    findThatHasMinusThanXTrophiesInLeague(x: number, leagueId: string): Promise<Club[]>;

    findThatHasMoreThanXYearsOfFoundation(x: number): Promise<Club[]>;

    findThatHasLessThanXYearsOfFoundation(x: number): Promise<Club[]>;

    findThatHasXYearsOfFoundation(x: number): Promise<Club[]>;

    findAll(): Promise<Club[]>;

    delete(id: string): Promise<Club>;

    exists(club: Club): Promise<boolean>;
}