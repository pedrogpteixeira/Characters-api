import mongoose, {Document, Schema} from 'mongoose';
import {IShadowPicturePersistence} from "../../../dataschema/Naruto/IShadowPicturePersistence";

const ShadowPictureSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        characterId: {type: String, required: true},
        data: {type: Buffer, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IShadowPicturePersistence & Document>('Naruto-ShadowPicture', ShadowPictureSchema);
