import {Result} from "../../../core/logic/Result";
import IQuoteDTO from "../../../dto/naruto/IQuoteDTO";

export default interface IQuoteService {
    saveQuote(quote: IQuoteDTO): Promise<Result<IQuoteDTO>>;
    findById(quoteId: string): Promise<Result<IQuoteDTO>>;
    findByCharacterId(quoteId: string): Promise<Result<IQuoteDTO[]>>;
    deleteQuote(quoteId: string): Promise<Result<IQuoteDTO>>;
}