import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Jutsu} from "../../domain/naruto/jutsu";
import IJutsuDTO from "../../dto/naruto/IJutsuDTO";
import {IJutsuPersistence} from "../../dataschema/Naruto/IJutsuPersistence";

export class JutsuMap extends Mapper<Jutsu> {
    public static toDTO(jutsu: Jutsu): IJutsuDTO {
        return {
            id: jutsu.id.toString(),
            name: jutsu.name,
            characterId: jutsu.characterId,
            data: jutsu.data
        } as IJutsuDTO;
    }

    public static toDTO2(jutsu: Jutsu): IJutsuDTO {
        return {
            id: jutsu.id.toString(),
            name: jutsu.name,
            characterId: jutsu.characterId,
            data: ""
        } as IJutsuDTO;
    }

    public static toDomain(jutsu: any | Model<IJutsuPersistence & Document>): Jutsu {
        const jutsuOrError = Jutsu.create(jutsu, new UniqueEntityID(jutsu.domainId));

        jutsuOrError.isFailure ? console.log(jutsuOrError.error) : '';

        return jutsuOrError.isSuccess ? jutsuOrError.getValue() : null;
    }

    public static toPersistence(jutsu: Jutsu): any {
        return {
            domainId: jutsu.id.toString(),
            name: jutsu.name,
            characterId: jutsu.characterId,
            data: jutsu.data
        };
    }
}