import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {CountryId} from "./countryId";
import ICountryDTO from "../../dto/world/ICountryDTO";

interface CountryProps {
    name: string;
    population: number;
    continentId: string;
}

export class Country extends AggregateRoot<CountryProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get population(): number {
        return this.props.population;
    }

    get continentId(): string {
        return this.props.continentId;
    }

    get countryId(): CountryId {
        return new CountryId(this.countryId.toValue());
    }

    private constructor(props: CountryProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(imageDTO: ICountryDTO, id?: UniqueEntityID): Result<Country> {
        const name = imageDTO.name;
        const continentId = imageDTO.continentId;
        const population = imageDTO.population;

        if (!!name == false || name.length === 0) {
            return Result.fail<Country>("Name is required");
        } else if (!!continentId == false || continentId.length === 0) {
            return Result.fail<Country>("Continent Id is required");
        } else if (!!population == false || population < 0) {
            return Result.fail<Country>("Population is required");
        } else {
            const country = new Country({
                name,
                population,
                continentId,
            }, id);
            return Result.ok<Country>(country)
        }
    }
}