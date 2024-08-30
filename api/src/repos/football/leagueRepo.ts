import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";

@Service()
export default class ContinentRepo implements IContinentRepo {
    private continent: any;

    constructor(
        @Inject('continentSchema') private continentSchema: Model<IContinentPersistence & Document>,
    ) {
    }

    public async findAll(): Promise<Continent[]> {
        try {
            const result = await this.continentSchema.find();
            if (result == null) {
                return null;
            }
            return result.map((continent) => ContinentMap.toDomain(continent));
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Continent> {
        try {
            const query = {name: {$regex: new RegExp(`^${name}$`, 'i')}};
            const continentDocument = await this.continentSchema.findOne(query);
            if (continentDocument == null) {
                return null;
            }
            return ContinentMap.toDomain(continentDocument);
        } catch (error) {
            throw error;
        }
    }

    public async save(continent: Continent): Promise<Continent> {
        try {
            if (await this.exists(continent)) {
                return null;
            }
            const persistence = ContinentMap.toPersistence(continent);
            const document = await this.continentSchema.create(persistence);
            return ContinentMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Continent> {
        try {
            const query = {domainId: id};
            const imageDocument = await this.continentSchema.findOne(query);
            if (imageDocument == null) {
                return null;
            }
            return ContinentMap.toDomain(imageDocument);
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Continent> {
        try {
            const query = {domainId: id};
            const imageDocument = await this.continentSchema.findOneAndDelete(query);
            if (imageDocument == null) {
                return null;
            }
            return ContinentMap.toDomain(imageDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(continent: Continent): Promise<boolean> {
        try {
            const query = {name: continent.name};
            const imageDocument = await this.continentSchema.findOne(query);
            return imageDocument != null;
        } catch (error) {
            throw error;
        }
    }


}