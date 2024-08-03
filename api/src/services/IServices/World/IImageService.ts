import {Result} from "../../../core/logic/Result";
import IImageDTO from "../../../dto/world/IImageDTO";
import {Image} from "../../../domain/world/image";

export default interface IImageService {
    saveImage(image: Image): Promise<Result<IImageDTO>>;
    findById(imageId: string): Promise<Result<IImageDTO>>;
    findByCountryId(countryId: string): Promise<Result<IImageDTO>>;
    findByName(name: string): Promise<Result<IImageDTO>>;
    deleteImage(imageId: string): Promise<Result<IImageDTO>>;
}