import {Result} from "../../../core/logic/Result";
import IJutsuDTO from "../../../dto/naruto/IJutsuDTO";
import {Jutsu} from "../../../domain/naruto/jutsu";

export default interface IJutsuService {
    saveVideo(jutsu: Jutsu): Promise<Result<IJutsuDTO>>;
    findById(jutsuId: string): Promise<Result<IJutsuDTO>>;
    findByCharacterId(characterId: string): Promise<Result<IJutsuDTO[]>>;
    findByName(name: string): Promise<Result<IJutsuDTO>>;
    deleteVideo(imageId: string): Promise<Result<IJutsuDTO>>;
}