import {Result} from "../../../core/logic/Result";
import IStadiumDTO from "../../../dto/football/IStadiumDTO";
import {Stadium} from "../../../domain/football/stadium";

export default interface IStadiumService {
    save(stadium: Stadium): Promise<Result<IStadiumDTO>>;

    findById(id: string): Promise<Result<IStadiumDTO>>;

    findByName(name: string): Promise<Result<IStadiumDTO>>;

    findByLocation(location: string): Promise<Result<IStadiumDTO>>;

    findByCountryId(countryId: string): Promise<Result<IStadiumDTO>>;

    findStadiumThatHasCapacityGreaterThan(capacity: number): Promise<Result<IStadiumDTO[]>>;

    findStadiumThatHasCapacityLessThan(capacity: number): Promise<Result<IStadiumDTO[]>>;

    findStadiumThatHasSurfaceType(surfaceType: string): Promise<Result<IStadiumDTO[]>>;

    findStadiumThatHasYearOpenedGreaterThan(yearOpened: number): Promise<Result<IStadiumDTO[]>>;

    findStadiumThatHasYearOpenedLessThan(yearOpened: number): Promise<Result<IStadiumDTO[]>>;

    findStadiumThatHasOpenedInYear(yearOpened: number): Promise<Result<IStadiumDTO[]>>;

    getAll(): Promise<Result<IStadiumDTO[]>>;

    delete(stadiumId: string): Promise<Result<IStadiumDTO>>;
}