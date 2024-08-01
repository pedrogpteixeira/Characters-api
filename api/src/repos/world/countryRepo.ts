import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import {ICountryPersistence} from "../../dataschema/World/ICountryPersistence";
import ICountryRepo from "../../services/IRepos/World/ICountryRepo";
import {Country} from "../../domain/world/country";
import {CountryMap} from "../../mappers/world/CountryMap";

@Service()
export default class CountryRepo implements ICountryRepo {
    private country: any;

    constructor(
        @Inject('countrySchema') private countrySchema: Model<ICountryPersistence & Document>,
    ) {
    }

    public async findCountriesByContinentId(continentId: string): Promise<Country[]> {
        try {
            const query = {continentId: continentId};
            const countryDocuments = await this.countrySchema.find(query);
            if (countryDocuments == null) {
                return null;
            }
            return countryDocuments.map((country) => CountryMap.toDomain(country));
        } catch (error) {
            throw error;
        }
    }

    public async save(country: Country): Promise<Country> {
        try {
            if (await this.exists(country)) {
                return null;
            }
            const persistence = CountryMap.toPersistence(country);
            const document = await this.countrySchema.create(persistence);
            return CountryMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Country> {
        try {
            const query = {domainId: id};
            const countryDocument = await this.countrySchema.findOne(query);
            if (countryDocument == null) {
                return null;
            }
            return CountryMap.toDomain(countryDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<Country> {
        try {
            const query = {name: {$regex: new RegExp(`^${name}$`, 'i')}};
            const countryDocument = await this.countrySchema.findOne(query);
            if (countryDocument == null) {
                return null;
            }
            return CountryMap.toDomain(countryDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<Country[]> {
        try {
            const result = await this.countrySchema.find();
            if (result == null) {
                return null;
            }
            return result.map((country) => CountryMap.toDomain(country));
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Country> {
        try {
            const query = {domainId: id};
            const countryDocument = await this.countrySchema.findOneAndDelete(query);
            if (countryDocument == null) {
                return null;
            }
            return CountryMap.toDomain(countryDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(country: Country): Promise<boolean> {
        try {
            const query = {name: country.name};
            const countryDocument = await this.countrySchema.findOne(query);
            return !!countryDocument === true;
        } catch (error) {
            throw error;
        }
    }

}