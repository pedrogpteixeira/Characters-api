import mongoose, {Document, Schema} from 'mongoose';
import {ICountryPersistence} from "../../../dataschema/World/ICountryPersistence";

const CountrySchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, unique: true, required: true},
        population: {type: Number, required: true},
        continentId: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ICountryPersistence & Document>('World-Country', CountrySchema);
