import {Inject, Service} from "typedi";
import INarutoRepo from "../../services/IRepos/Naruto/INarutoRepo";
import {Naruto} from "../../domain/naruto/naruto";
import {INarutoPersistence} from "../../dataschema/Naruto/INarutoPersistence";
import {Document, Model} from "mongoose";
import {NarutoMap} from "../../mappers/naruto/NarutoMap";

@Service()
export default class NarutoRepo implements INarutoRepo {
    private naruto: any;

    constructor(
        @Inject('narutoSchema') private narutoSchema: Model<INarutoPersistence & Document>,
    ) {
    }

    public async updateCharacter(id: string, naruto: Naruto): Promise<Naruto> {
        try {
            const query = {domainId: id};
            const persistence = NarutoMap.toPersistence(naruto);
            persistence.domainId = id;
            const document = await this.narutoSchema.findOneAndUpdate(query, persistence, {new: true});
            if (document == null) {
                return null;
            }
            return NarutoMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async saveCharacter(naruto: Naruto): Promise<Naruto> {
        try {
            if (await this.exists(naruto)) {
                return null;
            }
            const persistence = NarutoMap.toPersistence(naruto);
            const document = await this.narutoSchema.create(persistence);
            return NarutoMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async exists(naruto: Naruto): Promise<boolean> {
        try {
            const query = {name: naruto.name};
            const narutoDocument = await this.narutoSchema.findOne(query);
            return narutoDocument != null;
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Naruto> {
        try {
            const query = {name: name};
            const narutoDocument = this.narutoSchema.findOne(query);
            if (narutoDocument == null) {
                return null;
            }
            return NarutoMap.toDomain(narutoDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<Naruto[]> {
        try {
            const narutoDocuments = await this.narutoSchema.find();
            if (narutoDocuments == null)
                return null;
            return narutoDocuments.map((narutoDocument) => NarutoMap.toDomain(narutoDocument));
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Naruto> {
        try {
            const query = {domainId: id};
            const narutoDocument = await this.narutoSchema.findOne(query);
            if (narutoDocument == null) {
                return null;
            }
            return NarutoMap.toDomain(narutoDocument);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Naruto> {
        try {
            const query = {domainId: id};
            const narutoDocument = await this.narutoSchema.findOneAndDelete(query);
            return NarutoMap.toDomain(narutoDocument);
        } catch (error) {
            throw error;
        }
    }
}