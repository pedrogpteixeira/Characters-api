import {Naruto} from "../../../domain/naruto/naruto";

export default interface INarutoRepo {
    saveCharacter(naruto: Naruto): Promise<Naruto>;
    exists(naruto: Naruto): Promise<boolean>;
    findByName(name: string): Promise<Naruto>;
    findAll(): Promise<Naruto[]>;
    findById(id: string): Promise<Naruto>;
    updateCharacter(id: string, naruto: Naruto): Promise<Naruto>;
    delete(id: string): Promise<Naruto>;
}