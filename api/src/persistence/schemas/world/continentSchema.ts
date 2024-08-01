import mongoose, {Document, Schema} from 'mongoose';
import {IContinentPersistence} from "../../../dataschema/World/IContinentPersistence";

const ContinentSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, unique: true, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IContinentPersistence & Document>('World-Continent', ContinentSchema);
