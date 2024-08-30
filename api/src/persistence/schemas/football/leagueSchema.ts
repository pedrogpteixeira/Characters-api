import mongoose, {Document, Schema} from 'mongoose';
import {IContinentPersistence} from "../../../dataschema/World/IContinentPersistence";

const LeagueSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, unique: true, required: true},
        countryId: {type: String, required: true},
        numberOfTeams: {type: Number, required: true},
        division: {type: Number, required: true},
        description: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IContinentPersistence & Document>('Football-League', LeagueSchema);
