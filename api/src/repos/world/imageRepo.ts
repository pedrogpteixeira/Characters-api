import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import IImageRepo from "../../services/IRepos/World/IImageRepo";
import {IImagePersistence} from "../../dataschema/World/IImagePersistence";
import {Image} from "../../domain/world/image";
import {ImageMap} from "../../mappers/world/ImageMap";

@Service()
export default class ImageRepo implements IImageRepo {
    private image: any;

    constructor(
        @Inject('countryImageSchema') private countryImageSchema: Model<IImagePersistence & Document>,
    ) {
    }

    public async findByName(name: string): Promise<Image> {
        try {
            const result = await this.countryImageSchema.findOne({name: {$regex: new RegExp(`^${name}$`, 'i')}});
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
            const document = await this.countryImageSchema.create(persistence);
            return ImageMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Image> {
        try {
            const query = {domainId: id};
            const imageDocument = await this.countryImageSchema.findOne(query);
            if (imageDocument == null) {
                return null;
            }
            return ImageMap.toDomain(imageDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByCountryId(countryId: string): Promise<Image> {
        try {
            const query = {countryId: countryId};
            const imageDocument = await this.countryImageSchema.findOne(query);
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
            const imageDocument = await this.countryImageSchema.findOneAndDelete(query);
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
            const query = {countryId: image.countryId};
            const imageDocument = await this.countryImageSchema.findOne(query);
            return imageDocument != null;
        } catch (error) {
            throw error;
        }
    }


}