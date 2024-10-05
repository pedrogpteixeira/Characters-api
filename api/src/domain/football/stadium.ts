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
    surfaceType: string;
    dimensions: string;
    yearOpened: number;
    image: string;
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
        return this.props.surfaceType;
    }

    get dimensions(): string {
        return this.props.dimensions;
    }

    get year_opened(): number {
        return this.props.yearOpened;
    }

    get image(): string {
        return this.props.image;
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
        const surfaceType = stadiumDTO.surfaceType;
        const dimensions = stadiumDTO.dimensions;
        const yearOpened = stadiumDTO.yearOpened;
        const image = stadiumDTO.image;

        if (!!name == false || name.length === 0) {
            return Result.fail<Stadium>("Stadium name is required");
        } else if (!!countryId == false || countryId.length === 0) {
            return Result.fail<Stadium>("Country ID is required");
        } else if (!!location == false || location.length === 0) {
            return Result.fail<Stadium>("Location is required");
        } else if (!!capacity == false || capacity === 0) {
            return Result.fail<Stadium>("Capacity is required");
        } else if (!!surfaceType == false || surfaceType.length === 0) {
            return Result.fail<Stadium>("Surface type is required");
        } else if (!!dimensions == false || dimensions.length === 0) {
            return Result.fail<Stadium>("Dimensions is required");
        } else if (!!yearOpened == false || yearOpened === 0) {
            return Result.fail<Stadium>("Year opened is required");
        } else {
            const stadium = new Stadium({
                name,
                countryId,
                location,
                capacity,
                surfaceType,
                dimensions,
                yearOpened,
                image
            }, id);
            return Result.ok<Stadium>(stadium);
        }
    }
}