import {Inject, Service} from "typedi";
import config from "../../../config";
import {Result} from "../../core/logic/Result";
import IImageDTO from "../../dto/naruto/IImageDTO";
import IShadowPictureService from "../IServices/Naruto/IShadowPictureService";
import {ShadowPicture} from "../../domain/naruto/shadowPicture";
import IShadowPictureDTO from "../../dto/naruto/IShadowPictureDTO";
import IShadowPictureRepo from "../IRepos/Naruto/IShadowPictureRepo";
import {ShadowPictureMap} from "../../mappers/naruto/ShadowPictureMap";

@Service()
export default class ShadowPictureService implements IShadowPictureService {
    constructor(
        @Inject(config.repos.naruto.shadowPicture.name) private shadowPictureRepo: IShadowPictureRepo,
    ) {
    }

    public async saveImage(shadow: ShadowPicture): Promise<Result<IShadowPictureDTO>> {
        try {
            const result = await this.shadowPictureRepo.save(shadow);
            if (result == null) {
                return Result.fail<IImageDTO>("Character already has a shadow picture.");
            }
            return Result.ok<IShadowPictureDTO>(ShadowPictureMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

    public async findById(shadowId: string): Promise<Result<IShadowPictureDTO>> {
        try {
            const result = await this.shadowPictureRepo.findById(shadowId);
            if (result == null) {
                return Result.fail<IShadowPictureDTO>("Image not found.");
            }
            return Result.ok<IShadowPictureDTO>(ShadowPictureMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(shadowId: string): Promise<Result<IShadowPictureDTO>> {
        try {
            const result = await this.shadowPictureRepo.findByCharacterId(shadowId);
            if (result == null) {
                return Result.fail<IShadowPictureDTO>("Image not found.");
            }
            return Result.ok<IShadowPictureDTO>(ShadowPictureMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

    public async deleteImage(shadowId: string): Promise<Result<IShadowPictureDTO>> {
        try {
            const result = await this.shadowPictureRepo.delete(shadowId);
            if (result == null) {
                return Result.fail<IShadowPictureDTO>("Image not found.");
            }
            return Result.ok<IShadowPictureDTO>(ShadowPictureMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }
}