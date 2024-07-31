import {Result} from "../../../core/logic/Result";
import {ShadowPicture} from "../../../domain/naruto/shadowPicture";
import IShadowPictureDTO from "../../../dto/naruto/IShadowPictureDTO";

export default interface IShadowPictureService {
    saveImage(shadow: ShadowPicture): Promise<Result<IShadowPictureDTO>>;
    findById(shadowId: string): Promise<Result<IShadowPictureDTO>>;
    findByCharacterId(shadowId: string): Promise<Result<IShadowPictureDTO>>;
    deleteImage(shadowId: string): Promise<Result<IShadowPictureDTO>>;
}