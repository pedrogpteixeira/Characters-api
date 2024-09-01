import {Inject, Service} from "typedi";
import config from "../../../../config";
import {Result} from "../../../core/logic/Result";
import IContinentService from "../../IServices/World/IContinentService";
import IContinentRepo from "../../IRepos/World/IContinentRepo";
import {Continent} from "../../../domain/world/continent";
import IContinentDTO from "../../../dto/world/IContinentDTO";
import {ContinentMap} from "../../../mappers/world/ContinentMap";
import ILeagueService from "../../IServices/Football/ILeagueService";
import ILeagueRepo from "../../IRepos/Football/ILeagueRepo";
import {League} from "../../../domain/football/league";
import ILeagueDTO from "../../../dto/football/ILeagueDTO";
import {LeagueMap} from "../../../mappers/football/LeagueMap";

@Service()
export default class LeagueService implements ILeagueService {
    constructor(
        @Inject(config.repos.football.league.name) private leagueRepo: ILeagueRepo,
    ) {
    }

    public async save(league: League): Promise<Result<ILeagueDTO>> {
        try {
            const leagueOrError = await this.leagueRepo.save(league);
            if (leagueOrError == null) {
                return Result.fail<ILeagueDTO>("League already exists");
            }

            return Result.ok<ILeagueDTO>(LeagueMap.toDTO(leagueOrError));
        } catch (error) {
            throw error;
        }
    }

    public async findById(leagueId: string): Promise<Result<ILeagueDTO>> {
        try {
            const league = await this.leagueRepo.findById(leagueId);
            if (league == null) {
                return Result.fail<ILeagueDTO>("League not found");
            }

            return Result.ok<ILeagueDTO>(LeagueMap.toDTO(league));
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Result<ILeagueDTO>> {
        try {
            const league = await this.leagueRepo.findByName(name);
            if (league == null) {
                return Result.fail<ILeagueDTO>("League not found");
            }

            return Result.ok<ILeagueDTO>(LeagueMap.toDTO(league));
        } catch (error) {
            throw error;
        }
    }

    public async findByCountryId(countryId: string): Promise<Result<ILeagueDTO[]>> {
        try {
            const leagues = await this.leagueRepo.findByCountryId(countryId);
            if (leagues == null) {
                return Result.fail<ILeagueDTO[]>("Leagues not found");
            }

            return Result.ok<ILeagueDTO[]>(leagues.map(league => LeagueMap.toDTO(league)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMinusXTeams(x: number): Promise<Result<ILeagueDTO[]>> {
        try {
            const leagues = await this.leagueRepo.findThatHasMinusXTeams(x);
            if (leagues == null) {
                return Result.fail<ILeagueDTO[]>("Leagues not found");
            }

            return Result.ok<ILeagueDTO[]>(leagues.map(league => LeagueMap.toDTO(league)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMoreThanXTeams(x: number): Promise<Result<ILeagueDTO[]>> {
        try {
            const leagues = await this.leagueRepo.findThatHasMoreThanXTeams(x);
            if (leagues == null) {
                return Result.fail<ILeagueDTO[]>("Leagues not found");
            }

            return Result.ok<ILeagueDTO[]>(leagues.map(league => LeagueMap.toDTO(league)));
        } catch (error) {
            throw error;
        }
    }

    public async getAll(): Promise<Result<ILeagueDTO[]>> {
        try {
            const leagues = await this.leagueRepo.findAll();
            if (leagues == null) {
                return Result.fail<ILeagueDTO[]>("Leagues not found");
            }

            return Result.ok<ILeagueDTO[]>(leagues.map(league => LeagueMap.toDTO(league)));
        } catch (error) {
            throw error;
        }
    }

    public async delete(leagueId: string): Promise<Result<ILeagueDTO>> {
        try {
            const league = await this.leagueRepo.delete(leagueId);
            if (league == null) {
                return Result.fail<ILeagueDTO>("League not found");
            }

            return Result.ok<ILeagueDTO>(LeagueMap.toDTO(league));
        } catch (error) {
            throw error;
        }
    }

}