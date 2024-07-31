import {Image} from "../../../domain/naruto/image";


export default interface IImageRepo {
    save(image: Image): Promise<Image>;
    findById(id: string): Promise<Image>;
    findByCharacterId(characterId: string): Promise<Image>;
    findByName(name: string): Promise<Image>;
    delete(id: string): Promise<Image>;
    exists(image: Image): Promise<boolean>;
}