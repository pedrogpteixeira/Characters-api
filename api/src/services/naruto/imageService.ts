import {Inject, Service} from "typedi";
import IImageService from "../IServices/Naruto/IImageService";
import config from "../../../config";
import IImageRepo from "../IRepos/Naruto/IImageRepo";
import {Result} from "../../core/logic/Result";
import {Image} from "../../domain/naruto/image";
import IImageDTO from "../../dto/naruto/IImageDTO";
import {ImageMap} from "../../mappers/naruto/ImageMap";

@Service()
export default class ImageService implements IImageService {
    constructor(
        @Inject(config.repos.naruto.image.name) private imageRepo: IImageRepo,
    ) {
    }

    public async findById(imageId: string): Promise<Result<IImageDTO>> {
        try {
            const result = await this.imageRepo.findById(imageId);
            if (result == null) {
                return Result.fail<IImageDTO>("Image not found.");
            }
            return Result.ok<IImageDTO>(ImageMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Result<IImageDTO>> {
        try {
            const result = await this.imageRepo.findByName(name);
            if (result == null) {
                return Result.fail<IImageDTO>("Image not found.");
            }
            return Result.ok<IImageDTO>(ImageMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

    public async saveImage(image: Image): Promise<Result<IImageDTO>> {
        try {
            if (await this.imageRepo.exists(image)) {
                return Result.fail<IImageDTO>("This character already has an image.");
            }
            const result = await this.imageRepo.save(image);
            if (result == null) {
                return Result.fail<IImageDTO>("Failed to save image.");
            }
            return Result.ok<IImageDTO>(ImageMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(characterId: string): Promise<Result<IImageDTO>> {
        try {
            const result = await this.imageRepo.findByCharacterId(characterId);
            if (result == null) {
                return Result.fail<IImageDTO>("Image not found.");
            }
            return Result.ok<IImageDTO>(ImageMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

    public async deleteImage(imageId: string): Promise<Result<IImageDTO>> {
        try {
            const result = await this.imageRepo.delete(imageId);
            if (result == null) {
                return Result.fail<IImageDTO>("Failed to delete image.");
            }
            return Result.ok<IImageDTO>(ImageMap.toDTO(result));
        } catch (error) {
            throw error;
        }
    }

}