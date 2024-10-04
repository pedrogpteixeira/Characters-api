import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import IClubRepo from "../../services/IRepos/Football/IClubRepo";
import {IClubPersistence} from "../../dataschema/Football/IClubPersistence";
import {Club} from "../../domain/football/club";
import {ClubId} from "../../domain/football/clubId";
import {ClubMap} from "../../mappers/football/ClubMap";

@Service()
export default class ClubRepo implements IClubRepo {
    private continent: any;

    constructor(
        @Inject('clubSchema') private clubSchema: Model<IClubPersistence & Document>,
    ) {
    }

    public async findThatHasXTrophies(x: number): Promise<Club[]> {
        try {
            const query = {trophies: x};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasXTrophiesInCountry(x: number, countryId: string): Promise<Club[]> {
        try {
            const query = {trophies: x, countryId: countryId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasMoreThanXTrophiesInCountry(x: number, countryId: string): Promise<Club[]> {
        try {
            const query = {trophies: {$gt: x}, countryId: countryId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasMinusThanXTrophiesInCountry(x: number, countryId: string): Promise<Club[]> {
        try {
            const query = {trophies: {$lt: x}, countryId: countryId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasXTrophiesInLeague(x: number, leagueId: string): Promise<Club[]> {
        try {
            const query = {trophies: x, leagueId: leagueId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasMoreThanXTrophiesInLeague(x: number, leagueId: string): Promise<Club[]> {
        try {
            const query = {trophies: {$gt: x}, leagueId: leagueId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasMinusThanXTrophiesInLeague(x: number, leagueId: string): Promise<Club[]> {
        try {
            const query = {trophies: {$lt: x}, leagueId: leagueId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasMoreThanXYearsOfFoundation(x: number): Promise<Club[]> {
        try {
            const query = {foundationYear: {$gt: x}};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasLessThanXYearsOfFoundation(x: number): Promise<Club[]> {
        try {
            const query = {foundationYear: {$lt: x}};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasXYearsOfFoundation(x: number): Promise<Club[]> {
        try {
            const query = {foundationYear: x};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async save(club: Club): Promise<Club> {
        try {
            if (await this.exists(club)) {
                return null;
            }
            const persistence = ClubMap.toPersistence(club);
            const document = await this.clubSchema.create(persistence);
            return ClubMap.toDomain(document);
        } catch (e) {
            throw e;
        }
    }

    public async findById(id: string): Promise<Club> {
        try {
            const query = {domainId: id};
            const clubDocument = await this.clubSchema.findOne(query);
            if (clubDocument == null) {
                return null;
            }
            return ClubMap.toDomain(clubDocument);
        } catch (e) {
            throw e;
        }
    }

    public async findByName(name: string): Promise<Club> {
        try {
            const query = {name: {$regex: new RegExp(`^${name}$`, 'i')}};
            const clubDocument = await this.clubSchema.findOne(query);
            if (clubDocument == null) {
                return null;
            }
            return ClubMap.toDomain(clubDocument);
        } catch (e) {
            throw e;
        }
    }

    public async findByLeagueId(leagueId: string): Promise<Club[]> {
        try {
            const query = {leagueId: leagueId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findByStadiumId(stadiumId: string): Promise<Club[]> {
        try {
            const query = {stadiumId: stadiumId};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasMinusXTrophies(x: number): Promise<Club[]> {
        try {
            const query = {trophies: {$lt: x}};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findThatHasMoreThanXTrophies(x: number): Promise<Club[]> {
        try {
            const query = {trophies: {$gt: x}};
            const clubDocument = await this.clubSchema.find(query);
            if (clubDocument == null) {
                return null;
            }
            return clubDocument.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async findAll(): Promise<Club[]> {
        try {
            const result = await this.clubSchema.find();
            if (result == null) {
                return null;
            }
            return result.map(document => ClubMap.toDomain(document));
        } catch (e) {
            throw e;
        }
    }

    public async delete(id: string): Promise<Club> {
        try {
            const query = {domainId: id};
            const clubDocument = await this.clubSchema.findOneAndDelete(query);
            if (clubDocument == null) {
                return null;
            }
            return ClubMap.toDomain(clubDocument);
        } catch (e) {
            throw e;
        }
    }

    public async exists(club: Club): Promise<boolean> {
        try {
            const query = {name: {$regex: new RegExp(`^${club.name}$`, 'i')}, leagueId: club.leagueId};
            const clubDocument = await this.clubSchema.findOne(query);
            return !!clubDocument == true;
        } catch (e) {
            throw e;
        }
    }

}