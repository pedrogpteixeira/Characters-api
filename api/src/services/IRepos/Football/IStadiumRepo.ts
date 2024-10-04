import {Stadium} from "../../../domain/football/stadium";

export default interface IStadiumRepo {
    save(stadium: Stadium): Promise<Stadium>;

    findById(id: string): Promise<Stadium>;

    findByName(name: string): Promise<Stadium>;

    findByCountryId(countryId: string): Promise<Stadium>;

    findByLocation(location: string): Promise<Stadium>;

    findStadiumThatHasCapacityGreaterThan(capacity: number): Promise<Stadium[]>;

    findStadiumThatHasCapacityLessThan(capacity: number): Promise<Stadium[]>;

    findStadiumThatHasSurfaceType(surfaceType: string): Promise<Stadium[]>;

    findStadiumThatHasYearOpenedGreaterThan(yearOpened: number): Promise<Stadium[]>;

    findStadiumThatHasYearOpenedLessThan(yearOpened: number): Promise<Stadium[]>;

    findStadiumThatHasOpenedInYear(yearOpened: number): Promise<Stadium[]>;

    findAll(): Promise<Stadium[]>;

    delete(id: string): Promise<Stadium>;

    exists(stadium: Stadium): Promise<boolean>;
}