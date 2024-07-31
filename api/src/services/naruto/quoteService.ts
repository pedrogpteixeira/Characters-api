import {Inject, Service} from "typedi";
import config from "../../../config";
import {Result} from "../../core/logic/Result";
import {Quote} from "../../domain/naruto/quote";
import IQuoteDTO from "../../dto/naruto/IQuoteDTO";
import IQuoteRepo from "../IRepos/Naruto/IQuoteRepo";
import IQuoteService from "../IServices/Naruto/IQuoteService";
import {QuoteMap} from "../../mappers/naruto/QuoteMap";

@Service()
export default class QuoteService implements IQuoteService {
    constructor(
        @Inject(config.repos.naruto.quote.name) private quoteRepo: IQuoteRepo,
    ) {
    }

    public async saveQuote(quote: IQuoteDTO): Promise<Result<IQuoteDTO>> {
        try {
            const quoteOrError = Quote.create(quote);
            if (quoteOrError.isFailure) {
                return Result.fail<IQuoteDTO>(quoteOrError.errorValue());
            }
            const quoteResult = quoteOrError.getValue();
            const save = await this.quoteRepo.save(quoteResult);
            if (save == null) {
                return Result.fail<IQuoteDTO>("Quote already exists");
            }
            return Result.ok<IQuoteDTO>(QuoteMap.toDTO(quoteResult));
        } catch (e) {
            throw e;
        }
    }

    public async findById(quoteId: string): Promise<Result<IQuoteDTO>> {
        try {
            const quote = await this.quoteRepo.findById(quoteId);
            if (quote == null) {
                return Result.fail<IQuoteDTO>("Quote not found");
            }
            return Result.ok<IQuoteDTO>(QuoteMap.toDTO(quote));
        } catch (e) {
            throw e;
        }
    }

    public async findByCharacterId(quoteId: string): Promise<Result<IQuoteDTO[]>> {
        try {
            const quotes = await this.quoteRepo.findByCharacterId(quoteId);
            if (quotes == null) {
                return Result.fail<IQuoteDTO[]>("Quote not found");
            }
            return Result.ok<IQuoteDTO[]>(quotes.map(quote => QuoteMap.toDTO(quote)));
        } catch (e) {
            throw e;
        }
    }

    public async deleteQuote(quoteId: string): Promise<Result<IQuoteDTO>> {
        try {
            const quote = await this.quoteRepo.delete(quoteId);
            if (quote == null) {
                return Result.fail<IQuoteDTO>("Quote not found");
            }
            return Result.ok<IQuoteDTO>(QuoteMap.toDTO(quote));
        } catch (e) {
            throw e;
        }
    }

}