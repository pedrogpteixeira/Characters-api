import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {League} from "../../domain/football/league";
import ILeagueDTO from "../../dto/football/ILeagueDTO";
import {ILeaguePersistence} from "../../dataschema/Football/ILeaguePersistence";

export class LeagueMap extends Mapper<League> {
    public static toDTO(league: League): ILeagueDTO {
        return {
            id: league.id.toString(),
            name: league.name,
            countryId: league.countryId,
            numberOfTeams: league.numberOfTeams,
            division: league.division,
            image: "",
            description: league.description
        } as ILeagueDTO;
    }

    public static toDTOWithImage(league: League): ILeagueDTO {
        return {
            id: league.id.toString(),
            name: league.name,
            countryId: league.countryId,
            numberOfTeams: league.numberOfTeams,
            division: league.division,
            image: league.image,
            description: league.description
        } as ILeagueDTO;
    }

    public static toDomain(league: any | Model<ILeaguePersistence & Document>): League {
        const leagueOrError = League.create(league, new UniqueEntityID(league.domainId));

        leagueOrError.isFailure ? console.log(leagueOrError.error) : '';

        return leagueOrError.isSuccess ? leagueOrError.getValue() : null;
    }

    public static toPersistence(league: League): any {
        return {
            domainId: league.id.toString(),
            name: league.name,
            countryId: league.countryId,
            numberOfTeams: league.numberOfTeams,
            division: league.division,
            image: league.image,
            description: league.description
        };
    }
}