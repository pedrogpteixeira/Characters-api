import {Request, Response, NextFunction} from "express";
import INarutoService from "../../services/IServices/Naruto/INarutoService";
import {Inject, Service} from "typedi";
import config from "../../../config";
import IQuoteController from "../IControllers/Naruto/IQuoteController";
import IQuoteService from "../../services/IServices/Naruto/IQuoteService";
import IQuoteDTO from "../../dto/naruto/IQuoteDTO";

@Service()
export default class QuoteController implements IQuoteController {

    constructor(
        @Inject(config.services.naruto.naruto.name) private narutoServiceInstance: INarutoService,
        @Inject(config.services.naruto.quote.name) private quoteServiceInstance: IQuoteService
    ) {
    }

    public async uploadQuote(req: Request, res: Response, next: NextFunction) {
        try {
            const quote = req.body as IQuoteDTO;

            const naruto = await this.narutoServiceInstance.findById(quote.characterId);

            if (naruto.isFailure) {
                return res.status(404).json({message: "Naruto character not found"});
            }

            const result = await this.quoteServiceInstance.saveQuote(quote);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getQuoteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const result = await this.quoteServiceInstance.findById(id);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async getQuotesByCharacterId(req: Request, res: Response, next: NextFunction) {
        try {
            const characterId = req.params.characterId;

            const result = await this.quoteServiceInstance.findByCharacterId(characterId);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

    public async deleteQuote(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;

            const result = await this.quoteServiceInstance.deleteQuote(id);

            if (result.isFailure) {
                return res.status(404).json(result.errorValue());
            }

            return res.status(200).json(result.getValue());
        } catch (error) {
            next(error);
        }
    }

}