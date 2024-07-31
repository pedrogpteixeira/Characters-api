import {Result} from "../../../core/logic/Result";
import {EyePicture} from "../../../domain/naruto/eyePicture";
import IEyePictureDTO from "../../../dto/naruto/IEyePictureDTO";

export default interface IEyePictureService {
    saveImage(eye: EyePicture): Promise<Result<IEyePictureDTO>>;
    findById(eyeId: string): Promise<Result<IEyePictureDTO>>;
    findByCharacterId(eyeId: string): Promise<Result<IEyePictureDTO>>;
    deleteImage(eyeId: string): Promise<Result<IEyePictureDTO>>;
}