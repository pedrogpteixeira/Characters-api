import {Inject, Service} from "typedi";
import config from "../../../../config";
import IEyePictureService from "../../IServices/Naruto/IEyePictureService";
import IEyePictureRepo from "../../IRepos/Naruto/IEyePictureRepo";
import {Result} from "../../../core/logic/Result";
import {EyePicture} from "../../../domain/naruto/eyePicture";
import IEyePictureDTO from "../../../dto/naruto/IEyePictureDTO";
import {EyePictureMap} from "../../../mappers/naruto/EyePictureMap";

@Service()
export default class EyePictureService implements IEyePictureService {
    constructor(
        @Inject(config.repos.naruto.eyePicture.name) private eyePictureRepo: IEyePictureRepo,
    ) {
    }

    public async saveImage(eye: EyePicture): Promise<Result<IEyePictureDTO>> {
        try {
            const eyeOrError = await this.eyePictureRepo.save(eye);
            if (eyeOrError == null) {
                return Result.fail<IEyePictureDTO>('Character already has an eye picture');
            }
            return Result.ok<IEyePictureDTO>(EyePictureMap.toDTO(eyeOrError));
        } catch (error) {
            throw error;
        }
    }

    public async findById(eyeId: string): Promise<Result<IEyePictureDTO>> {
        try {
            const eye = await this.eyePictureRepo.findById(eyeId);
            if (eye == null) {
                return Result.fail<IEyePictureDTO>('Eye picture not found');
            }
            return Result.ok<IEyePictureDTO>(EyePictureMap.toDTO(eye));
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(eyeId: string): Promise<Result<IEyePictureDTO>> {
        try {
            const eye = await this.eyePictureRepo.findByCharacterId(eyeId);
            if (eye == null) {
                return Result.fail<IEyePictureDTO>('Eye picture not found');
            }
            return Result.ok<IEyePictureDTO>(EyePictureMap.toDTO(eye));
        } catch (error) {
            throw error;
        }
    }

    public async deleteImage(eyeId: string): Promise<Result<IEyePictureDTO>> {
        try {
            const eye = await this.eyePictureRepo.delete(eyeId);
            if (eye == null) {
                return Result.fail<IEyePictureDTO>('Eye picture not found');
            }
            return Result.ok<IEyePictureDTO>(EyePictureMap.toDTO(eye));
        } catch (error) {
            throw error;
        }
    }

}