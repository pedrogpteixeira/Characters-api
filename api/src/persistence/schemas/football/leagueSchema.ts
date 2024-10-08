import mongoose, {Document, Schema} from 'mongoose';
import {ILeaguePersistence} from "../../../dataschema/Football/ILeaguePersistence";

const LeagueSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, required: true},
        countryId: {type: String, required: true},
        numberOfTeams: {type: Number, required: true},
        division: {type: Number, required: true},
        image: {type: String},
        description: {type: String},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<ILeaguePersistence & Document>('Football-League', LeagueSchema);
