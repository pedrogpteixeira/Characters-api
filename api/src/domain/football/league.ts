import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {LeagueId} from "./leagueId";
import ILeagueDTO from "../../dto/football/ILeagueDTO";

interface LeagueProps {
    name: string;
    countryId: string;
    numberOfTeams: number;
    division: number;
    description: string;
}

export class League extends AggregateRoot<LeagueProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get countryId(): string {
        return this.props.countryId;
    }

    get numberOfTeams(): number {
        return this.props.numberOfTeams;
    }

    get division(): number {
        return this.props.division;
    }

    get description(): string {
        return this.props.description;
    }

    get leagueId(): LeagueId {
        return new LeagueId(this.leagueId.toValue());
    }

    private constructor(props: LeagueProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(leagueDTO: ILeagueDTO, id?: UniqueEntityID): Result<League> {
        const name = leagueDTO.name;
        const countryId = leagueDTO.countryId;
        const numberOfTeams = leagueDTO.numberOfTeams;
        const division = leagueDTO.division;
        const description = leagueDTO.description;

        if (!!name == false || name.length === 0) {
            return Result.fail<League>("Name is required");
        } else if (!!countryId == false || countryId.length === 0) {
            return Result.fail<League>("Country is required");
        } else if (!!numberOfTeams == false || numberOfTeams < 0) {
            return Result.fail<League>("Number of teams is required");
        } else if (!!division == false || division < 0) {
            return Result.fail<League>("Division is required");
        } else if (!!description == false || description.length === 0) {
            return Result.fail<League>("Description is required");
        } else {
            const league = new League({
                name,
                countryId,
                numberOfTeams,
                division,
                description
            }, id);
            return Result.ok<League>(league)
        }
    }
}