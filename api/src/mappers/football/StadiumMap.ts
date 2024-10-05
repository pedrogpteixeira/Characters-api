import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Stadium} from "../../domain/football/stadium";
import IStadiumDTO from "../../dto/football/IStadiumDTO";
import {IStadiumPersistence} from "../../dataschema/Football/IStadiumPersistence";

export class StadiumMap extends Mapper<Stadium> {
    public static toDTO(stadium: Stadium): IStadiumDTO {
        return {
            id: stadium.id.toString(),
            name: stadium.name,
            countryId: stadium.countryId,
            location: stadium.location,
            capacity: stadium.capacity,
            surfaceType: stadium.surface_type,
            dimensions: stadium.dimensions,
            yearOpened: stadium.year_opened,
            image: ""
        } as IStadiumDTO;
    }

    public static toDTOWithImage(stadium: Stadium): IStadiumDTO {
        return {
            id: stadium.id.toString(),
            name: stadium.name,
            countryId: stadium.countryId,
            location: stadium.location,
            capacity: stadium.capacity,
            surfaceType: stadium.surface_type,
            dimensions: stadium.dimensions,
            yearOpened: stadium.year_opened,
            image: stadium.image
        } as IStadiumDTO;
    }

    public static toDomain(club: any | Model<IStadiumPersistence & Document>): Stadium {
        const stadiumOrError = Stadium.create(club, new UniqueEntityID(club.domainId));

        stadiumOrError.isFailure ? console.log(stadiumOrError.error) : '';

        return stadiumOrError.isSuccess ? stadiumOrError.getValue() : null;
    }

    public static toPersistence(stadium: Stadium): any {
        return {
            domainId: stadium.id.toString(),
            name: stadium.name,
            location: stadium.location,
            countryId: stadium.countryId,
            capacity: stadium.capacity,
            surfaceType: stadium.surface_type,
            dimensions: stadium.dimensions,
            yearOpened: stadium.year_opened,
            image: stadium.image
        };
    }
}