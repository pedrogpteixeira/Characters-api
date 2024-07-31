import {ShadowPicture} from "../../../domain/naruto/shadowPicture";

export default interface IShadowPictureRepo {
    save(shadow: ShadowPicture): Promise<ShadowPicture>;
    findById(id: string): Promise<ShadowPicture>;
    findByCharacterId(characterId: string): Promise<ShadowPicture>;
    delete(id: string): Promise<ShadowPicture>;
    exists(shadow: ShadowPicture): Promise<boolean>;
}