import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {ShadowPicture} from "../../domain/naruto/shadowPicture";
import IShadowPictureDTO from "../../dto/naruto/IShadowPictureDTO";
import {IShadowPicturePersistence} from "../../dataschema/Naruto/IShadowPicturePersistence";

export class ShadowPictureMap extends Mapper<ShadowPicture> {
    public static toDTO(shadow: ShadowPicture): IShadowPictureDTO {
        return {
            id: shadow.id.toString(),
            characterId: shadow.characterId,
            data: shadow.data
        } as IShadowPictureDTO;
    }

    public static toDomain(shadow: any | Model<IShadowPicturePersistence & Document>): ShadowPicture {
        const shadowOrError = ShadowPicture.create(shadow, new UniqueEntityID(shadow.domainId));

        shadowOrError.isFailure ? console.log(shadowOrError.error) : '';

        return shadowOrError.isSuccess ? shadowOrError.getValue() : null;
    }

    public static toPersistence(shadow: ShadowPicture): any {
        return {
            domainId: shadow.id.toString(),
            characterId: shadow.characterId,
            data: shadow.data
        };
    }
}