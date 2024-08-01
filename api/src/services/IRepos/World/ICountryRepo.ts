import {Country} from "../../../domain/world/country";

export default interface ICountryRepo {
    save(country: Country): Promise<Country>;

    findById(id: string): Promise<Country>;

    findByName(name: string): Promise<Country>;

    findCountriesByContinentId(continentId: string): Promise<Country[]>;

    findAll(): Promise<Country[]>;

    delete(id: string): Promise<Country>;

    exists(country: Country): Promise<boolean>;
}