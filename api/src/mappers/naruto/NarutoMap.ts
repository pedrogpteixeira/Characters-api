import {Mapper} from "../../core/infra/Mapper";
import {Naruto} from "../../domain/naruto/naruto";
import INarutoDTO from "../../dto/naruto/INarutoDTO";
import {INarutoPersistence} from "../../dataschema/Naruto/INarutoPersistence";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

export class NarutoMap extends Mapper<Naruto> {
    public static toDTO(naruto: Naruto): INarutoDTO {
        return {
            id: naruto.id.toString(),
            name: naruto.name,
            gender: naruto.gender,
            affiliation: naruto.affiliation,
            jutsu_type: naruto.jutsu_type,
            kekkei_genkai: naruto.kekkei_genkai,
            nature_type: naruto.nature_type,
            attribute: naruto.attribute,
            debut_arc: naruto.debut_arc,
            vital_state: naruto.vital_state,
            occupation: naruto.occupation
        } as INarutoDTO;
    }

    public static toDomain(naruto: any | Model<INarutoPersistence & Document>): Naruto {
        const narutoOrError = Naruto.create(naruto, new UniqueEntityID(naruto.domainId));

        narutoOrError.isFailure ? console.log(narutoOrError.error) : '';

        return narutoOrError.isSuccess ? narutoOrError.getValue() : null;
    }

    public static toPersistence(naruto: Naruto): any {
        return {
            domainId: naruto.id.toString(),
            name: naruto.name,
            gender: naruto.gender,
            affiliation: naruto.affiliation,
            jutsu_type: naruto.jutsu_type,
            kekkei_genkai: naruto.kekkei_genkai,
            nature_type: naruto.nature_type,
            attribute: naruto.attribute,
            debut_arc: naruto.debut_arc,
            vital_state: naruto.vital_state,
            occupation: naruto.occupation
        };
    }
}