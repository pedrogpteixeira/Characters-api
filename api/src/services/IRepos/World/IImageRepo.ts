import {Image} from "../../../domain/world/image";

export default interface IImageRepo {
    save(image: Image): Promise<Image>;
    findById(id: string): Promise<Image>;
    findByCountryId(characterId: string): Promise<Image>;
    findByName(name: string): Promise<Image>;
    delete(id: string): Promise<Image>;
    exists(image: Image): Promise<boolean>;
}