import mongoose, {Document, Schema} from 'mongoose';
import {IQuotePersistence} from "../../../dataschema/Naruto/IQuotePersistence";


const QuoteSchema: Schema = new Schema(
    {
        domainId: {type: String, unique: true, required: true},
        characterId: {type: String, required: true},
        text: {type: String, required: true},
        receiver: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IQuotePersistence & Document>('Naruto-Quote', QuoteSchema);
