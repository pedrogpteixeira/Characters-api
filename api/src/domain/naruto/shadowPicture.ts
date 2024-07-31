import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {ShadowPictureId} from "./shadowPictureId";
import IShadowPictureDTO from "../../dto/naruto/IShadowPictureDTO";

interface ShadowPictureProps {
    characterId: string;
    data: string;
}

export class ShadowPicture extends AggregateRoot<ShadowPictureProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get shadowPictureId(): ShadowPictureId {
        return new ShadowPictureId(this.shadowPictureId.toValue());
    }

    get characterId(): string {
        return this.props.characterId;
    }

    get data(): string {
        return this.props.data;
    }

    private constructor(props: ShadowPictureProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(shadowPictureDTO: IShadowPictureDTO, id?: UniqueEntityID): Result<ShadowPicture> {
        const characterId = shadowPictureDTO.characterId;
        const data = shadowPictureDTO.data;

        if (!!characterId == false || characterId.length == 0) {
            return Result.fail<ShadowPicture>("Character ID is required");
        } else if (!!data == false || data.length === 0) {
            return Result.fail<ShadowPicture>("Data is required");
        } else {
            const image = new ShadowPicture({
                characterId,
                data
            }, id);
            return Result.ok<ShadowPicture>(image)
        }
    }
}