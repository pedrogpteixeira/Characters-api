import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import IStadiumDTO from "../../dto/football/IStadiumDTO";
import {StadiumId} from "./stadiumId";

interface StadiumProps {
    name: string;
    countryId: string;
    location: string;
    capacity: number;
    surface_type: string;
    dimensions: string;
    year_opened: number;
}

export class Stadium extends AggregateRoot<StadiumProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get countryId(): string {
        return this.props.countryId;
    }

    get location(): string {
        return this.props.location;
    }

    get capacity(): number {
        return this.props.capacity;
    }

    get surface_type(): string {
        return this.props.surface_type;
    }

    get dimensions(): string {
        return this.props.dimensions;
    }

    get year_opened(): number {
        return this.props.year_opened;
    }

    get clubId(): StadiumId {
        return new StadiumId(this.clubId.toValue());
    }

    private constructor(props: StadiumProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(stadiumDTO: IStadiumDTO, id?: UniqueEntityID): Result<Stadium> {
        const name = stadiumDTO.name;
        const countryId = stadiumDTO.countryId;
        const location = stadiumDTO.location;
        const capacity = stadiumDTO.capacity;
        const surface_type = stadiumDTO.surface_type;
        const dimensions = stadiumDTO.dimensions;
        const year_opened = stadiumDTO.year_opened;

        if (!!name == false || name.length === 0) {
            return Result.fail<Stadium>("Stadium name is required");
        } else if (!!countryId == false || countryId.length === 0) {
            return Result.fail<Stadium>("Country ID is required");
        } else if (!!location == false || location.length === 0) {
            return Result.fail<Stadium>("Location is required");
        } else if (!!capacity == false || capacity === 0) {
            return Result.fail<Stadium>("Capacity is required");
        } else if (!!surface_type == false || surface_type.length === 0) {
            return Result.fail<Stadium>("Surface type is required");
        } else if (!!dimensions == false || dimensions.length === 0) {
            return Result.fail<Stadium>("Dimensions is required");
        } else if (!!year_opened == false || year_opened === 0) {
            return Result.fail<Stadium>("Year opened is required");
        } else {
            const stadium = new Stadium({
                name,
                countryId,
                location,
                capacity,
                surface_type,
                dimensions,
                year_opened
            }, id);
            return Result.ok<Stadium>(stadium);
        }
    }
}