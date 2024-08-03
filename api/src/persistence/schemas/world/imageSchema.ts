import mongoose, {Document, Schema} from 'mongoose';
import {IImagePersistence} from "../../../dataschema/World/IImagePersistence";

const ImageSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, unique: true, required: true},
        countryId: {type: String, required: true},
        data: {type: Buffer, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IImagePersistence & Document>('World-Country-Image', ImageSchema);
