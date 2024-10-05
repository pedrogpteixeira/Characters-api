import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import IStadiumRepo from "../../services/IRepos/Football/IStadiumRepo";
import {IStadiumPersistence} from "../../dataschema/Football/IStadiumPersistence";
import {Stadium} from "../../domain/football/stadium";
import {StadiumMap} from "../../mappers/football/StadiumMap";


@Service()
export default class StadiumRepo implements IStadiumRepo {
    private stadium: any;

    constructor(
        @Inject('stadiumSchema') private stadiumSchema: Model<IStadiumPersistence & Document>,
    ) {
    }

    public async save(stadium: Stadium): Promise<Stadium> {
        try {
            if (await this.exists(stadium)) {
                return null;
            }
            const persistence = StadiumMap.toPersistence(stadium);
            const document = await this.stadiumSchema.create(persistence);
            return StadiumMap.toDomain(document);
        } catch (err) {
            throw err;
        }
    }

    public async findById(id: string): Promise<Stadium> {
        try {
            const query = {domainId: id};
            const stadiumDocument = await this.stadiumSchema.findOne(query);
            if (stadiumDocument == null) {
                return null;
            }
            return StadiumMap.toDomain(stadiumDocument);
        } catch (err) {
            throw err;

        }
    }

    public async findByName(name: string): Promise<Stadium> {
        try {
            const query = {name: {$regex: new RegExp(`^${name}$`, 'i')}};
            const stadiumDocument = await this.stadiumSchema.findOne(query);
            if (stadiumDocument == null) {
                return null;
            }
            return StadiumMap.toDomain(stadiumDocument);
        } catch (err) {
            throw err;
        }
    }

    public async findByCountryId(countryId: string): Promise<Stadium> {
        try {
            const query = {countryId: countryId};
            const stadiumDocument = await this.stadium.findOne(query);
            if (stadiumDocument == null) {
                return null;
            }
            return StadiumMap.toDomain(stadiumDocument);
        } catch (err) {
            throw err;
        }
    }

    public async findByLocation(location: string): Promise<Stadium> {
        try {
            const query = {location: {$regex: new RegExp(`^${location}$`, 'i')}};
            const stadiumDocument = await this.stadiumSchema.findOne(query);
            if (stadiumDocument == null) {
                return null;
            }
            return StadiumMap.toDomain(stadiumDocument);
        } catch (err) {
            throw err;
        }
    }

    public async findStadiumThatHasCapacityGreaterThan(capacity: number): Promise<Stadium[]> {
        try {
            const query = {capacity: {$gt: capacity}};
            const stadiumDocument = await this.stadiumSchema.find(query);
            if (stadiumDocument == null) {
                return null;
            }
            return stadiumDocument.map((stadium) => StadiumMap.toDomain(stadium));
        } catch (err) {
            throw err;
        }
    }

    public async findStadiumThatHasCapacityLessThan(capacity: number): Promise<Stadium[]> {
        try {
            const query = {capacity: {$lt: capacity}};
            const stadiumDocument = await this.stadiumSchema.find(query);
            if (stadiumDocument == null) {
                return null;
            }
            return stadiumDocument.map((stadium) => StadiumMap.toDomain(stadium));
        } catch (err) {
            throw err;
        }
    }

    public async findStadiumThatHasSurfaceType(surfaceType: string): Promise<Stadium[]> {
        try {
            const query = {surfaceType: {$regex: new RegExp(`^${surfaceType}$`, 'i')}};
            const stadiumDocument = await this.stadiumSchema.find(query);
            if (stadiumDocument == null) {
                return null;
            }
            return stadiumDocument.map((stadium) => StadiumMap.toDomain(stadium));
        } catch (err) {
            throw err;
        }
    }

    public async findStadiumThatHasYearOpenedGreaterThan(yearOpened: number): Promise<Stadium[]> {
        try {
            const query = {yearOpened: {$gt: yearOpened}};
            const stadiumDocument = await this.stadiumSchema.find(query);
            if (stadiumDocument == null) {
                return null;
            }
            return stadiumDocument.map((stadium) => StadiumMap.toDomain(stadium));
        } catch (err) {
            throw err;
        }
    }

    public async findStadiumThatHasYearOpenedLessThan(yearOpened: number): Promise<Stadium[]> {
        try {
            const query = {yearOpened: {$lt: yearOpened}};
            const stadiumDocument = await this.stadiumSchema.find(query);
            if (stadiumDocument == null) {
                return null;
            }
            return stadiumDocument.map((stadium) => StadiumMap.toDomain(stadium));
        } catch (err) {
            throw err;
        }
    }

    public async findStadiumThatHasOpenedInYear(yearOpened: number): Promise<Stadium[]> {
        try {
            const query = {yearOpened: yearOpened};
            const stadiumDocument = await this.stadiumSchema.find(query);
            if (stadiumDocument == null) {
                return null;
            }
            return stadiumDocument.map((stadium) => StadiumMap.toDomain(stadium));
        } catch (err) {
            throw err;
        }
    }

    public async findAll(): Promise<Stadium[]> {
        try {
            const stadiumDocument = await this.stadiumSchema.find();
            if (stadiumDocument == null) {
                return null;
            }
            return stadiumDocument.map((stadium) => StadiumMap.toDomain(stadium));
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: string): Promise<Stadium> {
        try {
            const query = {domainId: id};
            const stadiumDocument = await this.stadiumSchema.findOneAndDelete(query);
            if (stadiumDocument == null) {
                return null;
            }
            return StadiumMap.toDomain(stadiumDocument);
        } catch (err) {
            throw err;
        }
    }

    public async exists(stadium: Stadium): Promise<boolean> {
        try {
            const query = {
                name: stadium.name,
                location: stadium.location,
                countryId: stadium.countryId,
            };
            const stadiumDocument = await this.stadiumSchema.findOne(query);
            return stadiumDocument != null
        } catch (err) {
            throw err;
        }
    }

}