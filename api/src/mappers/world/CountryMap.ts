import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Country} from "../../domain/world/country";
import ICountryDTO from "../../dto/world/ICountryDTO";
import {ICountryPersistence} from "../../dataschema/World/ICountryPersistence";

export class CountryMap extends Mapper<Country> {
    public static toDTO(country: Country): ICountryDTO {
        return {
            id: country.id.toString(),
            name: country.name,
            population: country.population,
            continentId: country.continentId
        } as ICountryDTO;
    }

    public static toDomain(country: any | Model<ICountryPersistence & Document>): Country {
        const imageOrError = Country.create(country, new UniqueEntityID(country.domainId));

        imageOrError.isFailure ? console.log(imageOrError.error) : '';

        return imageOrError.isSuccess ? imageOrError.getValue() : null;
    }

    public static toPersistence(country: Country): any {
        return {
            domainId: country.id.toString(),
            name: country.name,
            population: country.population,
            continentId: country.continentId
        };
    }
}