import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import ILeagueRepo from "../../services/IRepos/Football/ILeagueRepo";
import {ILeaguePersistence} from "../../dataschema/Football/ILeaguePersistence";
import {League} from "../../domain/football/league";
import {LeagueMap} from "../../mappers/football/LeagueMap";

@Service()
export default class LeagueRepo implements ILeagueRepo {
    private continent: any;

    constructor(
        @Inject('leagueSchema') private leagueSchema: Model<ILeaguePersistence & Document>,
    ) {
    }

    public async save(league: League): Promise<League> {
        try {
            if (await this.exists(league)) {
                return null;
            }
            const persistence = LeagueMap.toPersistence(league);
            const document = await this.leagueSchema.create(persistence);
            return LeagueMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<League> {
        try {
            const query = {domainId: id};
            const imageDocument = await this.leagueSchema.findOne(query);
            if (imageDocument == null) {
                return null;
            }
            return LeagueMap.toDomain(imageDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByName(name: string): Promise<League> {
        try {
            const query = {name: {$regex: new RegExp(`^${name}$`, 'i')}};
            const leagueDocument = await this.leagueSchema.findOne(query);
            if (leagueDocument == null) {
                return null;
            }
            return LeagueMap.toDomain(leagueDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByCountryId(countryId: string): Promise<League[]> {
        try {
            const query = {countryId: countryId};
            const leagueDocument = await this.leagueSchema.find(query);
            if (leagueDocument == null) {
                return null;
            }
            return leagueDocument.map((league) => LeagueMap.toDomain(league));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMinusXTeams(x: number): Promise<League[]> {
        try {
            const query = {numberOfTeams: {$lt: x}};
            const leagueDocument = await this.leagueSchema.find(query);
            if (leagueDocument == null) {
                return null;
            }
            return leagueDocument.map((league) => LeagueMap.toDomain(league));
        } catch (error) {
            throw error;
        }
    }

    public async findThatHasMoreThanXTeams(x: number): Promise<League[]> {
        try {
            const query = {numberOfTeams: {$gt: x}};
            const leagueDocument = await this.leagueSchema.find(query);
            if (leagueDocument == null) {
                return null;
            }
            return leagueDocument.map((league) => LeagueMap.toDomain(league));
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<League[]> {
        try {
            const result = await this.leagueSchema.find();
            if (result == null) {
                return null;
            }
            return result.map((league) => LeagueMap.toDomain(league));
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<League> {
        try {
            const query = {domainId: id};
            const leagueDocument = await this.leagueSchema.findOneAndDelete(query);
            if (leagueDocument == null) {
                return null;
            }
            return LeagueMap.toDomain(leagueDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(league: League): Promise<boolean> {
        try {
            const query = {
                name: league.name,
                countryId: league.countryId,
                division: league.division,
                description: league.description
            };
            const leagueDocument = await this.leagueSchema.findOne(query);
            return leagueDocument != null;
        } catch (error) {
            throw error;
        }
    }

}