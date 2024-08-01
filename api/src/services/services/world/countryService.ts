import {Inject, Service} from "typedi";
import config from "../../../../config";
import {Result} from "../../../core/logic/Result";
import ICountryService from "../../IServices/World/ICountryService";
import ICountryRepo from "../../IRepos/World/ICountryRepo";
import {Country} from "../../../domain/world/country";
import ICountryDTO from "../../../dto/world/ICountryDTO";
import {CountryMap} from "../../../mappers/world/CountryMap";

@Service()
export default class CountryService implements ICountryService {
    constructor(
        @Inject(config.repos.world.country.name) private countryRepo: ICountryRepo,
    ) {
    }

    public async save(country: Country): Promise<Result<ICountryDTO>> {
        try {
            const countryOrError = await this.countryRepo.save(country);
            if (countryOrError == null) {
                return Result.fail<ICountryDTO>("Country already exists");
            }
            return Result.ok<ICountryDTO>(CountryMap.toDTO(countryOrError));
        } catch (e) {
            throw e;
        }
    }

    public async findById(countryId: string): Promise<Result<ICountryDTO>> {
        try {
            const country = await this.countryRepo.findById(countryId);
            if (country == null) {
                return Result.fail<ICountryDTO>(`Country with id ${countryId} not found`);
            }
            return Result.ok<ICountryDTO>(CountryMap.toDTO(country));
        } catch (e) {
            throw e;
        }
    }

    public async findByName(name: string): Promise<Result<ICountryDTO>> {
        try {
            const country = await this.countryRepo.findByName(name);
            if (country == null) {
                return Result.fail<ICountryDTO>(`Country with name ${name} not found`);
            }
            return Result.ok<ICountryDTO>(CountryMap.toDTO(country));
        } catch (e) {
            throw e;
        }
    }

    public async findByContinent(continentId: string): Promise<Result<ICountryDTO[]>> {
        try {
            const countries = await this.countryRepo.findCountriesByContinentId(continentId);
            if (countries == null) {
                return Result.fail<ICountryDTO[]>(`Countries with continent id ${continentId} not found`);
            }
            return Result.ok<ICountryDTO[]>(countries.map(country => CountryMap.toDTO(country)));
        } catch (e) {
            throw e;
        }
    }

    public async getAll(): Promise<Result<ICountryDTO[]>> {
        try {
            const countries = await this.countryRepo.findAll();
            if (countries == null) {
                return Result.fail<ICountryDTO[]>(`Countries not found`);
            }
            return Result.ok<ICountryDTO[]>(countries.map(country => CountryMap.toDTO(country)));
        } catch (e) {
            throw e;
        }
    }

    public async deleteCountry(countryId: string): Promise<Result<ICountryDTO>> {
        try {
            const country = await this.countryRepo.delete(countryId);
            if (country == null) {
                return Result.fail<ICountryDTO>(`Country with id ${countryId} not found`);
            }
            return Result.ok<ICountryDTO>(CountryMap.toDTO(country));
        } catch (e) {
            throw e;
        }
    }

}