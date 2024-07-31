import INarutoDTO from "../../../dto/naruto/INarutoDTO";
import {Result} from "../../../core/logic/Result";

export default interface INarutoService {
    saveCharacter(naruto: INarutoDTO): Promise<Result<INarutoDTO>>;

    findByName(name: string): Promise<Result<INarutoDTO>>;

    findAll(): Promise<Result<INarutoDTO[]>>;

    findById(id: string): Promise<Result<INarutoDTO>>;

    updateCharacter(id: string, naruto: INarutoDTO): Promise<Result<INarutoDTO>>;

    deleteById(id: string): Promise<Result<INarutoDTO>>;
}