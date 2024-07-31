import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import {IJutsuPersistence} from "../../dataschema/Naruto/IJutsuPersistence";
import IJutsuRepo from "../../services/IRepos/Naruto/IJutsuRepo";
import {Jutsu} from "../../domain/naruto/jutsu";
import {JutsuMap} from "../../mappers/naruto/JutsuMap";

@Service()
export default class JutsuRepo implements IJutsuRepo {
    private image: any;

    constructor(
        @Inject('jutsuSchema') private jutsuSchema: Model<IJutsuPersistence & Document>,
    ) {
    }

    public async save(jutsu: Jutsu): Promise<Jutsu> {
        try {
            if (await this.exists(jutsu)) {
                return null;
            }
            const persistence = JutsuMap.toPersistence(jutsu);
            const document = await this.jutsuSchema.create(persistence);
            return JutsuMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Jutsu> {
        try {
            const query = {domainId: id};
            const jutsuDocument = await this.jutsuSchema.findOne(query);
            if (jutsuDocument == null) {
                return null;
            }
            return JutsuMap.toDomain(jutsuDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(characterId: string): Promise<Jutsu[]> {
        try {
            const query = {characterId: characterId};
            const jutsuDocument = await this.jutsuSchema.find(query);
            if (jutsuDocument == null) {
                return null;
            }
            return jutsuDocument.map(jutsu => JutsuMap.toDomain(jutsu));
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Jutsu> {
        try {
            const query = {name: name};
            const jutsuDocument = await this.jutsuSchema.findOne(query);
            if (jutsuDocument == null) {
                return null;
            }
            return JutsuMap.toDomain(jutsuDocument);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Jutsu> {
        try {
            const query = {domainId: id};
            const jutsuDocument = await this.jutsuSchema.findOneAndDelete(query);
            if (jutsuDocument == null) {
                return null;
            }
            return JutsuMap.toDomain(jutsuDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(jutsu: Jutsu): Promise<boolean> {
        try {
            const query = {name: jutsu.name};
            const jutsuDocument = await this.jutsuSchema.findOne(query);
            return jutsuDocument != null;
        } catch (error) {
            throw error;
        }
    }

}