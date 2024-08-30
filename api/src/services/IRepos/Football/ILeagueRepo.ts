import {League} from "../../../domain/football/league";

export default interface ILeagueRepo {
    save(continent: League): Promise<League>;

    findById(id: string): Promise<League>;

    findByName(name: string): Promise<League>;

    findByCountryId(countryId: string): Promise<League[]>;

    findThatHasMinusXTeams(x: number): Promise<League[]>;

    findThatHasMoreThanXTeams(x: number): Promise<League[]>;

    findAll(): Promise<League[]>;

    delete(id: string): Promise<League>;

    exists(league: League): Promise<boolean>;
}