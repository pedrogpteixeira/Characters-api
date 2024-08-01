import {Inject, Service} from "typedi";
import config from "../../../../config";
import {Result} from "../../../core/logic/Result";
import IContinentService from "../../IServices/World/IContinentService";
import IContinentRepo from "../../IRepos/World/IContinentRepo";
import {Continent} from "../../../domain/world/continent";
import IContinentDTO from "../../../dto/world/IContinentDTO";
import {ContinentMap} from "../../../mappers/world/ContinentMap";

@Service()
export default class ContinentService implements IContinentService {
    constructor(
        @Inject(config.repos.world.continent.name) private continentRepo: IContinentRepo,
    ) {
    }

    public async getAll(): Promise<Result<IContinentDTO[]>> {
        try {
            const continents = await this.continentRepo.findAll();
            if (continents == null) {
                return Result.fail<IContinentDTO[]>("No continents found");
            }

            return Result.ok<IContinentDTO[]>(continents.map(continent => ContinentMap.toDTO(continent)));
        } catch (error) {
            return Result.fail<IContinentDTO[]>(error);
        }
    }

    public async save(continent: Continent): Promise<Result<IContinentDTO>> {
        try {
            const continentOrError = await this.continentRepo.save(continent);
            if (continentOrError == null) {
                return Result.fail<IContinentDTO>("Continent already exists");
            }

            return Result.ok<IContinentDTO>(ContinentMap.toDTO(continentOrError));
        } catch (e) {
            return Result.fail<IContinentDTO>(e)
        }
    }

    public async findById(continentId: string): Promise<Result<IContinentDTO>> {
        try {
            const continent = await this.continentRepo.findById(continentId);
            if (continent == null) {
                return Result.fail<IContinentDTO>("Continent not found");
            }

            return Result.ok<IContinentDTO>(ContinentMap.toDTO(continent));
        } catch (error) {
            return Result.fail<IContinentDTO>(error);
        }
    }

    public async findByName(name: string): Promise<Result<IContinentDTO>> {
        try {
            const continent = await this.continentRepo.findByName(name);
            if (continent == null) {
                return Result.fail<IContinentDTO>("Continent not found");
            }

            return Result.ok<IContinentDTO>(ContinentMap.toDTO(continent));
        } catch (error) {
            return Result.fail<IContinentDTO>(error);
        }
    }

    public async deleteContinent(continentId: string): Promise<Result<IContinentDTO>> {
        try {
            const continent = await this.continentRepo.delete(continentId);
            if (continent == null) {
                return Result.fail<IContinentDTO>("Continent not found");
            }

            return Result.ok<IContinentDTO>(ContinentMap.toDTO(continent));
        } catch (error) {
            return Result.fail<IContinentDTO>(error);
        }
    }

}