import {Inject, Service} from "typedi";
import {Document, Model} from "mongoose";
import IQuoteRepo from "../../services/IRepos/Naruto/IQuoteRepo";
import {IQuotePersistence} from "../../dataschema/Naruto/IQuotePersistence";
import {Quote} from "../../domain/naruto/quote";
import {QuoteMap} from "../../mappers/naruto/QuoteMap";

@Service()
export default class QuoteRepo implements IQuoteRepo {
    private quote: any;

    constructor(
        @Inject('quoteSchema') private quoteSchema: Model<IQuotePersistence & Document>,
    ) {
    }

    public async save(quote: Quote): Promise<Quote> {
        try {
            if (await this.exists(quote)) {
                return null;
            }
            const persistence = QuoteMap.toPersistence(quote);
            const document = await this.quoteSchema.create(persistence);
            return QuoteMap.toDomain(document);
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<Quote> {
        try {
            const query = {domainId: id};
            const quoteDocument = await this.quoteSchema.findOne(query);
            if (quoteDocument == null) {
                return null;
            }
            return QuoteMap.toDomain(quoteDocument);
        } catch (error) {
            throw error;
        }
    }

    public async findByCharacterId(characterId: string): Promise<Quote[]> {
        try {
            const query = {characterId: characterId};
            const quoteDocument = await this.quoteSchema.find(query);
            if (quoteDocument == null) {
                return null;
            }
            return quoteDocument.map(quote => QuoteMap.toDomain(quote));
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<Quote> {
        try {
            const query = {domainId: id};
            const quoteDocument = await this.quoteSchema.findOneAndDelete(query);
            if (quoteDocument == null) {
                return null;
            }
            return QuoteMap.toDomain(quoteDocument);
        } catch (error) {
            throw error;
        }
    }

    public async exists(quote: Quote): Promise<boolean> {
        try {
            const query = {characterId: quote.characterId, text: quote.text, receiver: quote.receiver};
            const quoteDocument = await this.quoteSchema.findOne(query);
            return quoteDocument != null;
        } catch (error) {
            throw error;
        }
    }

}