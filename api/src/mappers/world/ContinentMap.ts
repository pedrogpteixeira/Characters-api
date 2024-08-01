import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Continent} from "../../domain/world/continent";
import IContinentDTO from "../../dto/world/IContinentDTO";
import {IContinentPersistence} from "../../dataschema/World/IContinentPersistence";

export class ContinentMap extends Mapper<Continent> {
    public static toDTO(continent: Continent): IContinentDTO {
        return {
            id: continent.id.toString(),
            name: continent.name,
        } as IContinentDTO;
    }

    public static toDomain(continent: any | Model<IContinentPersistence & Document>): Continent {
        const imageOrError = Continent.create(continent, new UniqueEntityID(continent.domainId));

        imageOrError.isFailure ? console.log(imageOrError.error) : '';

        return imageOrError.isSuccess ? imageOrError.getValue() : null;
    }

    public static toPersistence(continent: Continent): any {
        return {
            domainId: continent.id.toString(),
            name: continent.name,
        };
    }
}