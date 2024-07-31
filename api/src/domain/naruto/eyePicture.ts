import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {EyePictureId} from "./eyePictureId";
import IEyePictureDTO from "../../dto/naruto/IEyePictureDTO";

interface EyePictureProps {
    characterId: string;
    data: string;
}

export class EyePicture extends AggregateRoot<EyePictureProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get eyePictureId(): EyePictureId {
        return new EyePictureId(this.eyePictureId.toValue());
    }

    get characterId(): string {
        return this.props.characterId;
    }

    get data(): string {
        return this.props.data;
    }

    private constructor(props: EyePictureProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(eyePictureDTO: IEyePictureDTO, id?: UniqueEntityID): Result<EyePicture> {
        const characterId = eyePictureDTO.characterId;
        const data = eyePictureDTO.data;

        if (!!characterId == false || characterId.length == 0) {
            return Result.fail<EyePicture>("Character ID is required");
        } else if (!!data == false || data.length === 0) {
            return Result.fail<EyePicture>("Data is required");
        } else {
            const image = new EyePicture({
                characterId,
                data
            }, id);
            return Result.ok<EyePicture>(image)
        }
    }
}