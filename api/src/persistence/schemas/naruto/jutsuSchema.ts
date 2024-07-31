import mongoose, {Document, Schema} from 'mongoose';
import {IImagePersistence} from "../../../dataschema/Naruto/IImagePersistence";
import {IJutsuPersistence} from "../../../dataschema/Naruto/IJutsuPersistence";

const JutsuSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, unique: true, required: true},
        characterId: {type: String, required: true},
        data: {type: Buffer, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IJutsuPersistence & Document>('Naruto-Jutsu',JutsuSchema);
