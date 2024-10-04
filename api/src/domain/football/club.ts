import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import IClubDTO from "../../dto/football/IClubDTO";
import {ClubId} from "./clubId";

interface ClubProps {
    name: string;
    leagueId: string;
    numberOfPlayers: number;
    trophies: number;
    stadiumId: string;
    foundationYear: number;
}

export class Club extends AggregateRoot<ClubProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get leagueId(): string {
        return this.props.leagueId;
    }

    get numberOfPlayers(): number {
        return this.props.numberOfPlayers;
    }

    get trophies(): number {
        return this.props.trophies;
    }

    get stadiumId(): string {
        return this.props.stadiumId;
    }

    get foundationYear(): number {
        return this.props.foundationYear;
    }

    get clubId(): ClubId {
        return new ClubId(this.clubId.toValue());
    }

    private constructor(props: ClubProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(clubDTO: IClubDTO, id?: UniqueEntityID): Result<Club> {
        const name = clubDTO.name;
        const leagueId = clubDTO.leagueId;
        const numberOfPlayers = clubDTO.numberOfPlayers;
        const trophies = clubDTO.trophies;
        const stadiumId = clubDTO.stadiumId;
        const foundationYear = clubDTO.foundationYear;

        if (!!name == false || name.length === 0) {
            return Result.fail<Club>("Name is required");
        } else if (!!leagueId == false || leagueId.length === 0) {
            return Result.fail<Club>("LeagueId is required");
        } else if (!!numberOfPlayers == false || numberOfPlayers < 0) {
            return Result.fail<Club>("Number of players is required");
        } else if (!!trophies == false || trophies < 0) {
            return Result.fail<Club>("Trophies is required");
        } else if (!!stadiumId == false || stadiumId.length === 0) {
            return Result.fail<Club>("StadiumId is required");
        } else if (!!foundationYear == false || foundationYear < 0) {
            return Result.fail<Club>("Foundation year is required");
        } else {
            const club = new Club({
                name,
                leagueId,
                numberOfPlayers,
                trophies,
                stadiumId,
                foundationYear
            }, id);
            return Result.ok<Club>(club);
        }
    }
}