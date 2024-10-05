import mongoose, {Document, Schema} from 'mongoose';
import {IStadiumPersistence} from "../../../dataschema/Football/IStadiumPersistence";

const StadiumSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, required: true},
        countryId: {type: String, required: true},
        location: {type: String, required: true},
        capacity: {type: Number, required: true},
        surfaceType: {type: String, required: true},
        dimensions: {type: String, required: true},
        yearOpened: {type: Number, required: true},
        image: {type: String}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IStadiumPersistence & Document>('Football-Stadium', StadiumSchema);
