import {Quote} from "../../../domain/naruto/quote";

export default interface IQuoteRepo {
    save(quote: Quote): Promise<Quote>;

    findById(id: string): Promise<Quote>;

    findByCharacterId(characterId: string): Promise<Quote[]>;

    delete(id: string): Promise<Quote>;

    exists(quote: Quote): Promise<boolean>;
}