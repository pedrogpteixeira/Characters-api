import {AggregateRoot} from "../../core/domain/AggregateRoot";
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";

import {Result} from "../../core/logic/Result";
import {ImageId} from "./imageId";
import IImageDTO from "../../dto/world/IImageDTO";

interface ImageProps {
    name: string;
    countryId: string;
    data: string;
}

export class Image extends AggregateRoot<ImageProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    get imageId(): ImageId {
        return new ImageId(this.imageId.toValue());
    }

    get countryId(): string {
        return this.props.countryId;
    }

    get data(): string {
        return this.props.data;
    }

    private constructor(props: ImageProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(imageDTO: IImageDTO, id?: UniqueEntityID): Result<Image> {
        const countryId = imageDTO.countryId;
        const data = imageDTO.data;
        const name = imageDTO.name;

        if (!!countryId == false || countryId.length == 0) {
            return Result.fail<Image>("Character ID is required");
        } else if (!!data == false || data.length === 0) {
            return Result.fail<Image>("Data is required");
        } else if (!!name == false || name.length === 0) {
            return Result.fail<Image>("Name is required");
        } else {
            const image = new Image({
                name,
                countryId,
                data
            }, id);
            return Result.ok<Image>(image)
        }
    }
}