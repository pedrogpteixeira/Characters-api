import {Mapper} from "../../core/infra/Mapper";
import {Document, Model} from 'mongoose';
import {UniqueEntityID} from "../../core/domain/UniqueEntityID";
import {Quote} from "../../domain/naruto/quote";
import IQuoteDTO from "../../dto/naruto/IQuoteDTO";
import {IQuotePersistence} from "../../dataschema/Naruto/IQuotePersistence";

export class QuoteMap extends Mapper<Quote> {
    public static toDTO(quote: Quote): IQuoteDTO {
        return {
            id: quote.id.toString(),
            characterId: quote.characterId,
            text: quote.text,
            receiver: quote.receiver
        } as IQuoteDTO;
    }

    public static toDomain(quote: any | Model<IQuotePersistence & Document>): Quote {
        const quoteOrError = Quote.create(quote, new UniqueEntityID(quote.domainId));

        quoteOrError.isFailure ? console.log(quoteOrError.error) : '';

        return quoteOrError.isSuccess ? quoteOrError.getValue() : null;
    }

    public static toPersistence(quote: Quote): any {
        return {
            domainId: quote.id.toString(),
            characterId: quote.characterId,
            text: quote.text,
            receiver: quote.receiver
        };
    }
}