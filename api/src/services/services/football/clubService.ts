import {Inject, Service} from "typedi";
import config from "../../../../config";
import {Result} from "../../../core/logic/Result";
import IClubService from "../../IServices/Football/IClubService";
import IClubRepo from "../../IRepos/Football/IClubRepo";
import {Club} from "../../../domain/football/club";
import IClubDTO from "../../../dto/football/IClubDTO";
import {ClubMap} from "../../../mappers/football/ClubMap";


@Service()
export default class ClubService implements IClubService {
    constructor(
        @Inject(config.repos.football.club.name) private clubRepo: IClubRepo,
    ) {
    }

    public async save(club: Club): Promise<Result<IClubDTO>> {
        try {
            const clubOrError = await this.clubRepo.save(club);
            if (clubOrError == null) {
                return Result.fail<IClubDTO>("Club already exists");
            }

            return Result.ok<IClubDTO>(ClubMap.toDTO(clubOrError));
        } catch (e) {
            throw e;
        }
    }

    public async findById(leagueId: string): Promise<Result<IClubDTO>> {
        try {
            const club = await this.clubRepo.findById(leagueId);
            if (club == null) {
                return Result.fail<IClubDTO>("Club not found");
            }

            return Result.ok<IClubDTO>(ClubMap.toDTO(club));
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Result<IClubDTO>> {
        try {
            const club = await this.clubRepo.findByName(name);
            if (club == null) {
                return Result.fail<IClubDTO>("Club not found");
            }

            return Result.ok<IClubDTO>(ClubMap.toDTO(club));
        } catch (error) {
            throw error;
        }
    }

    public async findByLeagueId(leagueId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findByLeagueId(leagueId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findByStadiumId(stadiumId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findByStadiumId(stadiumId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMinusXTrophies(x: number): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasMinusXTrophies(x);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMoreThanXTrophies(x: number): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasMoreThanXTrophies(x);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasXTrophies(x: number): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasXTrophies(x);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasXTrophiesInCountry(x: number, countryId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasXTrophiesInCountry(x, countryId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMoreThanXTrophiesInCountry(x: number, countryId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasMoreThanXTrophiesInCountry(x, countryId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMinusThanXTrophiesInCountry(x: number, countryId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasMinusThanXTrophiesInCountry(x, countryId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasXTrophiesInLeague(x: number, leagueId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasXTrophiesInLeague(x, leagueId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMoreThanXTrophiesInLeague(x: number, leagueId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasMoreThanXTrophiesInLeague(x, leagueId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMinusThanXTrophiesInLeague(x: number, leagueId: string): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasMinusThanXTrophiesInLeague(x, leagueId);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMoreThanXYearsOfFoundation(x: number): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasMoreThanXYearsOfFoundation(x);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasLessThanXYearsOfFoundation(x: number): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasLessThanXYearsOfFoundation(x);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasXYearsOfFoundation(x: number): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findThatHasXYearsOfFoundation(x);
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async getAll(): Promise<Result<IClubDTO[]>> {
        try {
            const clubs = await this.clubRepo.findAll();
            if (clubs == null) {
                return Result.fail<IClubDTO[]>("Clubs not found");
            }

            return Result.ok<IClubDTO[]>(clubs.map(club => ClubMap.toDTO(club)));
        } catch (error) {
            throw error;
        }
    }

    public async delete(clubId: string): Promise<Result<IClubDTO>> {
        try {
            const club = await this.clubRepo.delete(clubId);
            if (club == null) {
                return Result.fail<IClubDTO>("Club not found");
            }

            return Result.ok<IClubDTO>(ClubMap.toDTO(club));
        } catch (error) {
            throw error;
        }
    }


}