import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {ContinentId} from "./continentId";
import IContinentDTO from "../../dto/world/IContinentDTO";

interface ContinentProps {
    name: string;
}

export class Continent extends AggregateRoot<ContinentProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get continentId(): ContinentId {
        return new ContinentId(this.continentId.toValue());
    }

    private constructor(props: ContinentProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(imageDTO: IContinentDTO, id?: UniqueEntityID): Result<Continent> {
        const name = imageDTO.name;

        if (!!name == false || name.length === 0) {
            return Result.fail<Continent>("Name is required");
        } else {
            const image = new Continent({
                name,
            }, id);
            return Result.ok<Continent>(image)
        }
    }
}