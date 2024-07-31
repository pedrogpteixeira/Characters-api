import {Result} from "../../../core/logic/Result";
import IImageDTO from "../../../dto/naruto/IImageDTO";
import {Image} from "../../../domain/naruto/image";

export default interface IImageService {
    saveImage(image: Image): Promise<Result<IImageDTO>>;
    findById(imageId: string): Promise<Result<IImageDTO>>;
    findByCharacterId(characterId: string): Promise<Result<IImageDTO>>;
    findByName(name: string): Promise<Result<IImageDTO>>;
    deleteImage(imageId: string): Promise<Result<IImageDTO>>;
}