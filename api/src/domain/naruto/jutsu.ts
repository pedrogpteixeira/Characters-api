import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {ShadowPictureId} from "./shadowPictureId";
import {JutsuId} from "./jutsuId";
import IJutsuDTO from "../../dto/naruto/IJutsuDTO";

interface JutsuProps {
    name: string;
    characterId: string;
    data: string;
}

export class Jutsu extends AggregateRoot<JutsuProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get jutsuId(): JutsuId {
        return new ShadowPictureId(this.jutsuId.toValue());
    }

    get name(): string {
        return this.props.name;
    }

    get characterId(): string {
        return this.props.characterId;
    }

    get data(): string {
        return this.props.data;
    }

    private constructor(props: JutsuProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(jutsuDTO: IJutsuDTO, id?: UniqueEntityID): Result<Jutsu> {
        const name = jutsuDTO.name;
        const characterId = jutsuDTO.characterId;
        const data = jutsuDTO.data;

        if (!!name == false || name.length == 0) {
            return Result.fail<Jutsu>("Name is required");
        } else if (!!characterId == false || characterId.length == 0) {
            return Result.fail<Jutsu>("Character ID is required");
        } else if (!!data == false || data.length === 0) {
            return Result.fail<Jutsu>("Data is required");
        } else {
            const jutsu = new Jutsu({
                name,
                characterId,
                data
            }, id);
            return Result.ok<Jutsu>(jutsu);
        }
    }
}