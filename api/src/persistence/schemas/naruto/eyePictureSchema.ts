import mongoose, {Document, Schema} from 'mongoose';
import {IEyePicturePersistence} from "../../../dataschema/Naruto/IEyePicturePersistence";


const EyePictureSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        characterId: {type: String, required: true},
        data: {type: Buffer, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IEyePicturePersistence & Document>('Naruto-EyePicture', EyePictureSchema);
