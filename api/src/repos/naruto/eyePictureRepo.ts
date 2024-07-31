import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import IEyePictureRepo from "../../services/IRepos/Naruto/IEyePictureRepo";
import {IEyePicturePersistence} from "../../dataschema/Naruto/IEyePicturePersistence";
import {EyePicture} from "../../domain/naruto/eyePicture";
import {EyePictureMap} from "../../mappers/naruto/EyePictureMap";

@Service()
export default class EyePictureRepo implements IEyePictureRepo {
    private eye_picture: any;

    constructor(
        @Inject('eyePictureSchema') private eyePictureSchema: Model<IEyePicturePersistence & Document>,
    ) {
    }

    public async save(eye: EyePicture): Promise<EyePicture> {
        try {
            if (await this.exists(eye)) {
                return null;
            }
            const persistence = EyePictureMap.toPersistence(eye);
            const document = await this.eyePictureSchema.create(persistence);
            return EyePictureMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<EyePicture> {
        try {
            const query = {domainId: id};
            const eyeDocument = await this.eyePictureSchema.findOne(query);
            if (eyeDocument == null) {
                return null;
            }
            return EyePictureMap.toDomain(eyeDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(characterId: string): Promise<EyePicture> {
        try {
            const query = {characterId: characterId};
            const eyeDocument = await this.eyePictureSchema.findOne(query);
            if (eyeDocument == null) {
                return null;
            }
            return EyePictureMap.toDomain(eyeDocument);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<EyePicture> {
        try {
            const query = {domainId: id};
            const eyeDocument = await this.eyePictureSchema.findOneAndDelete(query);
            if (eyeDocument == null) {
                return null;
            }
            return EyePictureMap.toDomain(eyeDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(eye: EyePicture): Promise<boolean> {
        try {
            const query = {characterId: eye.characterId};
            const eyeDocument = await this.eyePictureSchema.findOne(query);
            return eyeDocument != null;
        } catch (error) {
            throw error;
        }
    }

}