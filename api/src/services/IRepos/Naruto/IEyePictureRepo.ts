import {EyePicture} from "../../../domain/naruto/eyePicture";

export default interface IEyePictureRepo {
    save(eye: EyePicture): Promise<EyePicture>;

    findById(id: string): Promise<EyePicture>;

    findByCharacterId(characterId: string): Promise<EyePicture>;

    delete(id: string): Promise<EyePicture>;

    exists(eye: EyePicture): Promise<boolean>;
}