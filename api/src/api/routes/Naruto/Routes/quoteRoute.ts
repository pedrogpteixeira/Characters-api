import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import IQuoteController from "../../../../controllers/IControllers/Naruto/IQuoteController";
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/quote', route);

    const ctrl = Container.get(config.controllers.naruto.quote.name) as IQuoteController;

    route.post('/', celebrate({
        body: Joi.object({
            characterId: Joi.string().required(),
            text: Joi.string().required(),
            receiver: Joi.string().required()
        }),
    }), async (req, res, next) => {
        console.log('Uploading quote...');
        ctrl.uploadQuote(req, res, next);
    });

    route.get('/character/:characterId', async (req, res, next) => {
        console.log('Getting quotes by character id...');
        ctrl.getQuotesByCharacterId(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting quote by id...');
        ctrl.getQuoteById(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting quote...');
        ctrl.deleteQuote(req, res, next);
    });
}