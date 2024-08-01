import config from "../../../../config";
import {Inject, Service} from "typedi";
import INarutoRepo from "../../IRepos/Naruto/INarutoRepo";
import INarutoService from "../../IServices/Naruto/INarutoService";
import {Result} from "../../../core/logic/Result";
import INarutoDTO from "../../../dto/naruto/INarutoDTO";
import {Naruto} from "../../../domain/naruto/naruto";
import {NarutoMap} from "../../../mappers/naruto/NarutoMap";

@Service()
export default class NarutoService implements INarutoService {
    constructor(
        @Inject(config.repos.naruto.naruto.name) private narutoRepo: INarutoRepo
    ) {
    }

    public async updateCharacter(id: string, naruto: INarutoDTO): Promise<Result<INarutoDTO>> {
        try {
            const narutoOrError = Naruto.create(naruto);
            if (narutoOrError.isFailure) {
                return Result.fail<INarutoDTO>(narutoOrError.errorValue());
            }

            const narutoResult = narutoOrError.getValue();
            const update = await this.narutoRepo.updateCharacter(id, narutoResult);
            if (update == null) {
                return Result.fail<INarutoDTO>("Naruto character not found");
            }
            return Result.ok<INarutoDTO>(NarutoMap.toDTO(update));
        } catch (error) {
            return Result.fail<INarutoDTO>(error);
        }
    }

    public async saveCharacter(naruto: INarutoDTO): Promise<Result<INarutoDTO>> {
        try {
            const narutoOrError = Naruto.create(naruto);
            if (narutoOrError.isFailure) {
                return Result.fail<INarutoDTO>(narutoOrError.errorValue());
            }

            const narutoResult = narutoOrError.getValue();
            const save = await this.narutoRepo.saveCharacter(narutoResult);
            if (save == null) {
                return Result.fail<INarutoDTO>("Naruto character already exists");
            }
            return Result.ok<INarutoDTO>(NarutoMap.toDTO(save));
        } catch (error) {
            return Result.fail<INarutoDTO>(error);
        }
    }

    public async findByName(name: string): Promise<Result<INarutoDTO>> {
        try {
            const naruto = await this.narutoRepo.findByName(name);
            if (naruto == null) {
                return Result.fail<INarutoDTO>("Naruto character not found");
            }
            return Result.ok<INarutoDTO>(NarutoMap.toDTO(naruto));
        } catch (error) {
            return Result.fail<INarutoDTO>(error);
        }
    }

    public async findAll(): Promise<Result<INarutoDTO[]>> {
        try {
            const search = await this.narutoRepo.findAll();
            return Result.ok<INarutoDTO[]>(search.map((naruto) => NarutoMap.toDTO(naruto)));
        } catch (error) {
            return Result.fail<INarutoDTO[]>(error);
        }
    }

    public async findById(id: string): Promise<Result<INarutoDTO>> {
        try {
            const naruto = await this.narutoRepo.findById(id);
            if (naruto == null) {
                return Result.fail<INarutoDTO>("Naruto character not found");
            }
            return Result.ok<INarutoDTO>(NarutoMap.toDTO(naruto));
        } catch (error) {
            return Result.fail<INarutoDTO>(error);
        }
    }

    public async deleteById(id: string): Promise<Result<INarutoDTO>> {
        try {
            const naruto = await this.narutoRepo.delete(id);
            if (naruto == null) {
                return Result.fail<INarutoDTO>("Naruto character not found");
            }
            return Result.ok<INarutoDTO>(NarutoMap.toDTO(naruto));
        } catch (error) {
            return Result.fail<INarutoDTO>(error);
        }
    }
}