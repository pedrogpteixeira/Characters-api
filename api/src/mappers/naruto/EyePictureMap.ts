import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {EyePicture} from "../../domain/naruto/eyePicture";
import {IEyePicturePersistence} from "../../dataschema/Naruto/IEyePicturePersistence";
import IEyePictureDTO from "../../dto/naruto/IEyePictureDTO";

export class EyePictureMap extends Mapper<EyePicture> {
    public static toDTO(eye: EyePicture): IEyePictureDTO {
        return {
            id: eye.id.toString(),
            characterId: eye.characterId,
            data: eye.data
        } as IEyePictureDTO;
    }

    public static toDomain(eye: any | Model<IEyePicturePersistence & Document>): EyePicture {
        const eyeOrError = EyePicture.create(eye, new UniqueEntityID(eye.domainId));

        eyeOrError.isFailure ? console.log(eyeOrError.error) : '';

        return eyeOrError.isSuccess ? eyeOrError.getValue() : null;
    }

    public static toPersistence(eye: EyePicture): any {
        return {
            domainId: eye.id.toString(),
            characterId: eye.characterId,
            data: eye.data
        };
    }
}