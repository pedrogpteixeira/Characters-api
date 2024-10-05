import {Inject, Service} from "typedi";
import config from "../../../../config";
import {Result} from "../../../core/logic/Result";
import IStadiumService from "../../IServices/Football/IStadiumService";
import IStadiumRepo from "../../IRepos/Football/IStadiumRepo";
import {Stadium} from "../../../domain/football/stadium";
import IStadiumDTO from "../../../dto/football/IStadiumDTO";
import {StadiumMap} from "../../../mappers/football/StadiumMap";

@Service()
export default class StadiumService implements IStadiumService {
    constructor(
        @Inject(config.repos.football.stadium.name) private stadiumRepo: IStadiumRepo,
    ) {
    }

    public async save(stadium: Stadium): Promise<Result<IStadiumDTO>> {
        try {
            const stadiumOrError = await this.stadiumRepo.save(stadium);
            if (stadiumOrError == null) {
                return Result.fail<IStadiumDTO>("Stadium already exists");
            }

            return Result.ok<IStadiumDTO>(StadiumMap.toDTO(stadiumOrError));
        } catch (e) {
            throw e;
        }
    }

    public async findById(id: string): Promise<Result<IStadiumDTO>> {
        try {
            const stadium = await this.stadiumRepo.findById(id);
            if (stadium == null) {
                return Result.fail<IStadiumDTO>("Stadium not found");
            }

            return Result.ok<IStadiumDTO>(StadiumMap.toDTO(stadium));
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Result<IStadiumDTO>> {
        try {
            const stadium = await this.stadiumRepo.findByName(name);
            if (stadium == null) {
                return Result.fail<IStadiumDTO>("Stadium not found");
            }

            return Result.ok<IStadiumDTO>(StadiumMap.toDTO(stadium));
        } catch (error) {
            throw error;
        }
    }

    public async findByLocation(location: string): Promise<Result<IStadiumDTO>> {
        try {
            const stadium = await this.stadiumRepo.findByLocation(location);
            if (stadium == null) {
                return Result.fail<IStadiumDTO>("Stadium not found");
            }

            return Result.ok<IStadiumDTO>(StadiumMap.toDTO(stadium));
        } catch (error) {
            throw error;
        }
    }

    public async findByCountryId(countryId: string): Promise<Result<IStadiumDTO>> {
        try {
            const stadium = await this.stadiumRepo.findByCountryId(countryId);
            if (stadium == null) {
                return Result.fail<IStadiumDTO>("Stadium not found");
            }

            return Result.ok<IStadiumDTO>(StadiumMap.toDTO(stadium));
        } catch (error) {
            throw error;
        }
    }

    public async findStadiumThatHasCapacityGreaterThan(capacity: number): Promise<Result<IStadiumDTO[]>> {
        try {
            const stadiums = await this.stadiumRepo.findStadiumThatHasCapacityGreaterThan(capacity);
            if (stadiums == null) {
                return Result.fail<IStadiumDTO[]>("Stadiums not found");
            }

            return Result.ok<IStadiumDTO[]>(stadiums.map(stadium => StadiumMap.toDTO(stadium)));
        } catch (error) {
            throw error;
        }
    }

    public async findStadiumThatHasCapacityLessThan(capacity: number): Promise<Result<IStadiumDTO[]>> {
        try {
            const stadiums = await this.stadiumRepo.findStadiumThatHasCapacityLessThan(capacity);
            if (stadiums == null) {
                return Result.fail<IStadiumDTO[]>("Stadiums not found");
            }

            return Result.ok<IStadiumDTO[]>(stadiums.map(stadium => StadiumMap.toDTO(stadium)));
        } catch (error) {
            throw error;
        }
    }

    public async findStadiumThatHasSurfaceType(surfaceType: string): Promise<Result<IStadiumDTO[]>> {
        try {
            const stadiums = await this.stadiumRepo.findStadiumThatHasSurfaceType(surfaceType);
            if (stadiums == null) {
                return Result.fail<IStadiumDTO[]>("Stadiums not found");
            }

            return Result.ok<IStadiumDTO[]>(stadiums.map(stadium => StadiumMap.toDTO(stadium)));
        } catch (error) {
            throw error;
        }
    }

    public async findStadiumThatHasYearOpenedGreaterThan(yearOpened: number): Promise<Result<IStadiumDTO[]>> {
        try {
            const stadiums = await this.stadiumRepo.findStadiumThatHasYearOpenedGreaterThan(yearOpened);
            if (stadiums == null) {
                return Result.fail<IStadiumDTO[]>("Stadiums not found");
            }

            return Result.ok<IStadiumDTO[]>(stadiums.map(stadium => StadiumMap.toDTO(stadium)));
        } catch (error) {
            throw error;
        }
    }

    public async findStadiumThatHasYearOpenedLessThan(yearOpened: number): Promise<Result<IStadiumDTO[]>> {
        try {
            const stadiums = await this.stadiumRepo.findStadiumThatHasYearOpenedLessThan(yearOpened);
            if (stadiums == null) {
                return Result.fail<IStadiumDTO[]>("Stadiums not found");
            }

            return Result.ok<IStadiumDTO[]>(stadiums.map(stadium => StadiumMap.toDTO(stadium)));
        } catch (error) {
            throw error;
        }
    }

    public async findStadiumThatHasOpenedInYear(yearOpened: number): Promise<Result<IStadiumDTO[]>> {
        try {
            const stadiums = await this.stadiumRepo.findStadiumThatHasOpenedInYear(yearOpened);
            if (stadiums == null) {
                return Result.fail<IStadiumDTO[]>("Stadiums not found");
            }

            return Result.ok<IStadiumDTO[]>(stadiums.map(stadium => StadiumMap.toDTO(stadium)));
        } catch (error) {
            throw error;
        }
    }

    public async getAll(): Promise<Result<IStadiumDTO[]>> {
        try {
            const stadiums = await this.stadiumRepo.findAll();
            if (stadiums == null) {
                return Result.fail<IStadiumDTO[]>("Stadiums not found");
            }

            return Result.ok<IStadiumDTO[]>(stadiums.map(stadium => StadiumMap.toDTO(stadium)));
        } catch (error) {
            throw error;
        }
    }

    public async delete(stadiumId: string): Promise<Result<IStadiumDTO>> {
        try {
            const stadium = await this.stadiumRepo.delete(stadiumId);
            if (stadium == null) {
                return Result.fail<IStadiumDTO>("Stadium not found");
            }

            return Result.ok<IStadiumDTO>(StadiumMap.toDTO(stadium));
        } catch (error) {
            throw error;
        }
    }

}