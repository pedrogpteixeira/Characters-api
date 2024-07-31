import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import IShadowPictureRepo from "../../services/IRepos/Naruto/IShadowPictureRepo";
import {IShadowPicturePersistence} from "../../dataschema/Naruto/IShadowPicturePersistence";
import {ShadowPicture} from "../../domain/naruto/shadowPicture";
import {ShadowPictureMap} from "../../mappers/naruto/ShadowPictureMap";

@Service()
export default class ShadowPictureRepo implements IShadowPictureRepo {
    private shadow_picture: any;

    constructor(
        @Inject('shadowPictureSchema') private shadowPictureSchema: Model<IShadowPicturePersistence & Document>,
    ) {
    }

    public async save(shadow: ShadowPicture): Promise<ShadowPicture> {
        try {
            if (await this.exists(shadow)) {
                return null;
            }
            const persistence = ShadowPictureMap.toPersistence(shadow);
            const document = await this.shadowPictureSchema.create(persistence);
            return ShadowPictureMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<ShadowPicture> {
        try {
            const query = {domainId: id};
            const shadowDocument = await this.shadowPictureSchema.findOne(query);
            if (shadowDocument == null) {
                return null;
            }
            return ShadowPictureMap.toDomain(shadowDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(characterId: string): Promise<ShadowPicture> {
        try {
            const query = {characterId: characterId};
            const shadowDocument = await this.shadowPictureSchema.findOne(query);
            if (shadowDocument == null) {
                return null;
            }
            return ShadowPictureMap.toDomain(shadowDocument);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<ShadowPicture> {
        try {
            const query = {domainId: id};
            const shadowDocument = await this.shadowPictureSchema.findOneAndDelete(query);
            if (shadowDocument == null) {
                return null;
            }
            return ShadowPictureMap.toDomain(shadowDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(shadow: ShadowPicture): Promise<boolean> {
        try {
            const query = {characterId: shadow.characterId};
            const shadowDocument = await this.shadowPictureSchema.findOne(query);
            return shadowDocument != null;
        } catch (error) {
            throw error;
        }
    }

}