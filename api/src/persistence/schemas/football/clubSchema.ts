import mongoose, {Document, Schema} from 'mongoose';
import {IClubPersistence} from "../../../dataschema/Football/IClubPersistence";

const ClubSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, required: true},
        leagueId: {type: String, required: true},
        numberOfPlayers: {type: Number, required: true},
        trophies: {type: Number, required: true},
        stadiumId: {type: String, required: true},
        foundationYear: {type: Number, required: true}
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IClubPersistence & Document>('Football-Club', ClubSchema);
