import {Inject, Service} from "typedi";
import config from "../../../../config";
import {Result} from "../../../core/logic/Result";
import IImageService from "../../IServices/World/IImageService";
import IImageRepo from "../../IRepos/World/IImageRepo";
import IImageDTO from "../../../dto/world/IImageDTO";
import {ImageMap} from "../../../mappers/world/ImageMap";
import {Image} from "../../../domain/world/image";

@Service()
export default class ImageService implements IImageService {
    constructor(
        @Inject(config.repos.world.country.image.name) private imageRepo: IImageRepo,
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
                return Result.fail<IImageDTO>("This country already has an image.");
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

    public async findByCountryId(characterId: string): Promise<Result<IImageDTO>> {
        try {
            const result = await this.imageRepo.findByCountryId(characterId);
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