import {Inject, Service} from "typedi";
import config from "../../../config";
import {Result} from "../../core/logic/Result";
import IJutsuService from "../IServices/Naruto/IJutsuService";
import {Jutsu} from "../../domain/naruto/jutsu";
import IJutsuDTO from "../../dto/naruto/IJutsuDTO";
import IJutsuRepo from "../IRepos/Naruto/IJutsuRepo";
import {JutsuMap} from "../../mappers/naruto/JutsuMap";

@Service()
export default class JutsuService implements IJutsuService {
    constructor(
        @Inject(config.repos.naruto.jutsu.name) private jutsuRepo: IJutsuRepo,
    ) {
    }

    public async saveVideo(jutsu: Jutsu): Promise<Result<IJutsuDTO>> {
        try {
            const savedJutsu = await this.jutsuRepo.save(jutsu);
            if (!savedJutsu) {
                return Result.fail<IJutsuDTO>("Jutsu already exists.");
            }

            return Result.ok<IJutsuDTO>(JutsuMap.toDTO(savedJutsu));
        } catch (error) {
            throw error;
        }
    }

    public async findById(jutsuId: string): Promise<Result<IJutsuDTO>> {
        try {
            const jutsu = await this.jutsuRepo.findById(jutsuId);
            if (!jutsu) {
                return Result.fail<IJutsuDTO>("Jutsu not found.");
            }

            return Result.ok<IJutsuDTO>(JutsuMap.toDTO(jutsu));
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(characterId: string): Promise<Result<IJutsuDTO[]>> {
        try {
            const jutsus = await this.jutsuRepo.findByCharacterId(characterId);
            if (!jutsus) {
                return Result.fail<IJutsuDTO[]>("Jutsus not found.");
            }

            return Result.ok<IJutsuDTO[]>(jutsus.map(jutsu => JutsuMap.toDTO2(jutsu)));
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Result<IJutsuDTO>> {
        try {
            const jutsu = await this.jutsuRepo.findByName(name);
            if (!jutsu) {
                return Result.fail<IJutsuDTO>("Jutsu not found.");
            }

            return Result.ok<IJutsuDTO>(JutsuMap.toDTO(jutsu));
        } catch (error) {
            throw error;
        }
    }

    public async deleteVideo(videoId: string): Promise<Result<IJutsuDTO>> {
        try {
            const jutsu = await this.jutsuRepo.delete(videoId);
            if (!jutsu) {
                return Result.fail<IJutsuDTO>("Jutsu not found.");
            }

            return Result.ok<IJutsuDTO>(JutsuMap.toDTO2(jutsu));
        } catch (error) {
            throw error;
        }
    }

}