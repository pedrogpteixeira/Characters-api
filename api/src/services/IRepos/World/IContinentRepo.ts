import {Continent} from "../../../domain/world/continent";

export default interface IContinentRepo {
    save(continent: Continent): Promise<Continent>;

    findById(id: string): Promise<Continent>;

    findByName(name: string): Promise<Continent>;

    findAll(): Promise<Continent[]>;

    delete(id: string): Promise<Continent>;

    exists(continent: Continent): Promise<boolean>;
}