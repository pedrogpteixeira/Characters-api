import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {NarutoId} from "./narutoId";
import INarutoDTO from "../../dto/naruto/INarutoDTO";
import {Result} from "../../core/logic/Result";

interface NarutoProps {
    name: string;
    gender: string;
    affiliation: string[];
    jutsu_type: string[];
    kekkei_genkai: string[];
    nature_type: string[];
    attribute: string[];
    debut_arc: string;
    vital_state: string;
    occupation: string[];
}

export class Naruto extends AggregateRoot<NarutoProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get narutoId(): NarutoId {
        return new NarutoId(this.narutoId.toValue());
    }

    get name(): string {
        return this.props.name;
    }

    get gender(): string {
        return this.props.gender;
    }

    get affiliation(): string[] {
        return this.props.affiliation;
    }

    get debut_arc(): string {
        return this.props.debut_arc;
    }

    get vital_state(): string {
        return this.props.vital_state;
    }

    get jutsu_type(): string[] {
        return this.props.jutsu_type;
    }

    get kekkei_genkai(): string[] {
        return this.props.kekkei_genkai;
    }

    get nature_type(): string[] {
        return this.props.nature_type;
    }

    get attribute(): string[] {
        return this.props.attribute;
    }

    get occupation(): string[] {
        return this.props.occupation;
    }

    private constructor(props: NarutoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(narutoDTO: INarutoDTO, id?: UniqueEntityID): Result<Naruto> {
        const name = narutoDTO.name;
        const gender = narutoDTO.gender;
        const affiliation = narutoDTO.affiliation;
        const jutsu_type = narutoDTO.jutsu_type;
        const kekkei_genkai = narutoDTO.kekkei_genkai;
        const nature_type = narutoDTO.nature_type;
        const attribute = narutoDTO.attribute;
        const debut_arc = narutoDTO.debut_arc;
        const vital_state = narutoDTO.vital_state;
        const occupation = narutoDTO.occupation;


        if (!!name === false || name.length === 0) {
            return Result.fail<Naruto>('Must provide a name')
        } else if (!!gender === false || gender.length === 0) {
            return Result.fail<Naruto>('Must provide a gender')
        } else if (!!affiliation === false || affiliation.length === 0) {
            return Result.fail<Naruto>('Must provide an affiliation')
        } else if (!!debut_arc === false || debut_arc.length === 0) {
            return Result.fail<Naruto>('Must provide a debut arc')
        } else if (!!vital_state === false || vital_state.length === 0) {
            return Result.fail<Naruto>('Must provide a vital state')
        } else if (!!jutsu_type === false) {
            return Result.fail<Naruto>('Must provide a jutsu type')
        } else if (!!kekkei_genkai === false) {
            return Result.fail<Naruto>('Must provide a kekkei genkai')
        } else if (!!nature_type === false) {
            return Result.fail<Naruto>('Must provide a nature type')
        } else if (!!attribute === false) {
            return Result.fail<Naruto>('Must provide an attribute')
        } else if (!!occupation === false) {
            return Result.fail<Naruto>('Must provide an occupation')
        } else {
            const naruto = new Naruto({
                name,
                gender,
                affiliation,
                jutsu_type,
                kekkei_genkai,
                nature_type,
                attribute,
                debut_arc,
                vital_state,
                occupation,
            }, id);
            return Result.ok<Naruto>(naruto)
        }
    }
}