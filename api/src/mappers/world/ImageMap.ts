import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Image} from "../../domain/world/image";
import IImageDTO from "../../dto/world/IImageDTO";
import {IImagePersistence} from "../../dataschema/World/IImagePersistence";

export class ImageMap extends Mapper<Image> {
    public static toDTO(image: Image): IImageDTO {
        return {
            id: image.id.toString(),
            name: image.name,
            countryId: image.countryId,
            data: image.data
        } as IImageDTO;
    }

    public static toDomain(image: any | Model<IImagePersistence & Document>): Image {
        const imageOrError = Image.create(image, new UniqueEntityID(image.domainId));

        imageOrError.isFailure ? console.log(imageOrError.error) : '';

        return imageOrError.isSuccess ? imageOrError.getValue() : null;
    }

    public static toPersistence(image: Image): any {
        return {
            domainId: image.id.toString(),
            name: image.name,
            countryId: image.countryId,
            data: image.data
        };
    }
}