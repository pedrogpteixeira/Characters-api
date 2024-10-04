import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Club} from "../../domain/football/club";
import IClubDTO from "../../dto/football/IClubDTO";
import {IClubPersistence} from "../../dataschema/Football/IClubPersistence";

export class ClubMap extends Mapper<Club> {
    public static toDTO(club: Club): IClubDTO {
        return {
            id: club.id.toString(),
            name: club.name,
            leagueId: club.leagueId,
            numberOfPlayers: club.numberOfPlayers,
            trophies: club.trophies,
            stadiumId: club.stadiumId,
            foundationYear: club.foundationYear
        } as IClubDTO;
    }

    public static toDomain(club: any | Model<IClubPersistence & Document>): Club {
        const clubOrError = Club.create(club, new UniqueEntityID(club.domainId));

        clubOrError.isFailure ? console.log(clubOrError.error) : '';

        return clubOrError.isSuccess ? clubOrError.getValue() : null;
    }

    public static toPersistence(club: Club): any {
        return {
            domainId: club.id.toString(),
            name: club.name,
            leagueId: club.leagueId,
            numberOfPlayers: club.numberOfPlayers,
            trophies: club.trophies,
            stadiumId: club.stadiumId,
            foundationYear: club.foundationYear
        };
    }
}