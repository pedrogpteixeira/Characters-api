import {Result} from "../../../core/logic/Result";
import {Continent} from "../../../domain/world/continent";
import IContinentDTO from "../../../dto/world/IContinentDTO";

export default interface IContinentService {
    save(continent: Continent): Promise<Result<IContinentDTO>>;
    findById(continentId: string): Promise<Result<IContinentDTO>>;
    findByName(name: string): Promise<Result<IContinentDTO>>;
    getAll(): Promise<Result<IContinentDTO[]>>;
    deleteContinent(continentId: string): Promise<Result<IContinentDTO>>;
}