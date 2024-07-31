import {Jutsu} from "../../../domain/naruto/jutsu";

export default interface IJutsuRepo {
    save(jutsu: Jutsu): Promise<Jutsu>;
    findById(id: string): Promise<Jutsu>;
    findByCharacterId(characterId: string): Promise<Jutsu[]>;
    findByName(name: string): Promise<Jutsu>;
    delete(id: string): Promise<Jutsu>;
    exists(jutsu: Jutsu): Promise<boolean>;
}