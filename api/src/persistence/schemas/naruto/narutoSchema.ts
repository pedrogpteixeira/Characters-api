import mongoose, {Document, Schema} from 'mongoose';
import {INarutoPersistence} from '../../../dataschema/Naruto/INarutoPersistence';

const NarutoSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        name: {type: String, unique: true, required: true},
        gender: {type: String, required: true},
        affiliation: {type: [String], required: true}, // Array of strings
        jutsu_type: {type: [String], required: true}, // Array of strings
        kekkei_genkai: {type: [String], required: true}, // Array of strings
        nature_type: {type: [String], required: true}, // Array of strings
        attribute: {type: [String], required: true}, // Array of strings
        debut_arc: {type: String, required: true},
        vital_state: {type: String, required: true},
        occupation: {type: [String], required: true}, // Array of strings
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<INarutoPersistence & Document>('Naruto', NarutoSchema);
