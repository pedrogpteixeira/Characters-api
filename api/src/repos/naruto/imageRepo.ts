import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import IImageRepo from "../../services/IRepos/Naruto/IImageRepo";
import {Result} from "../../core/logic/Result";
import {Image} from "../../domain/naruto/image";
import IImageDTO from "../../dto/naruto/IImageDTO";
import {IImagePersistence} from "../../dataschema/Naruto/IImagePersistence";
import {ImageMap} from "../../mappers/naruto/ImageMap";

@Service()
export default class ImageRepo implements IImageRepo {
    private image: any;

    constructor(
        @Inject('imageSchema') private imageSchema: Model<IImagePersistence & Document>,
    ) {
    }

    public async findByName(name: string): Promise<Image> {
        try {
            const result = await this.imageSchema.findOne({name: name});
            if (result == null) {
                return null;
            }
            return ImageMap.toDomain(result);
        } catch (error) {
            throw error;
        }
    }

    public async save(image: Image): Promise<Image> {
        try {
            if (await this.exists(image)) {
                return null;
            }
            const persistence = ImageMap.toPersistence(image);
            const document = await this.imageSchema.create(persistence);
            return ImageMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Image> {
        try {
            const query = {domainId: id};
            const imageDocument = await this.imageSchema.findOne(query);
            if (imageDocument == null) {
                return null;
            }
            return ImageMap.toDomain(imageDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(characterId: string): Promise<Image> {
        try {
            const query = {characterId: characterId};
            const imageDocument = await this.imageSchema.findOne(query);
            if (imageDocument == null) {
                return null;
            }
            return ImageMap.toDomain(imageDocument);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Image> {
        try {
            const query = {domainId: id};
            const imageDocument = await this.imageSchema.findOneAndDelete(query);
            if (imageDocument == null) {
                return null;
            }
            return ImageMap.toDomain(imageDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(image: Image): Promise<boolean> {
        try {
            const query = {characterId: image.characterId};
            const imageDocument = await this.imageSchema.findOne(query);
            return imageDocument != null;
        } catch (error) {
            throw error;
        }
    }


}