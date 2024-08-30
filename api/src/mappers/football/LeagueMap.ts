import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {League} from "../../domain/football/league";
import ILeagueDTO from "../../dto/football/ILeagueDTO";

export class LeagueMap extends Mapper<League> {
    public static toDTO(league: League): ILeagueDTO {
        return {
            id: league.id.toString(),
            name: league.name,
            countryId: league.countryId,
            numberOfTeams: league.numberOfTeams,
            division: league.division,
            description: league.description
        } as ILeagueDTO;
    }

    public static toDomain(country: any | Model<ILeaguePersistence & Document>): Country {
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