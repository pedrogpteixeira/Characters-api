import {Result} from "../../../core/logic/Result";
import ICountryDTO from "../../../dto/world/ICountryDTO";
import {Country} from "../../../domain/world/country";

export default interface ICountryService {
    save(country: Country): Promise<Result<ICountryDTO>>;
    findById(countryId: string): Promise<Result<ICountryDTO>>;
    findByName(name: string): Promise<Result<ICountryDTO>>;
    findByContinent(continentId: string): Promise<Result<ICountryDTO[]>>;
    getAll(): Promise<Result<ICountryDTO[]>>;
    deleteCountry(countryId: string): Promise<Result<ICountryDTO>>;
}