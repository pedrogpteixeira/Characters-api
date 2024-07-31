import {NextFunction, Request, Response, Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import INarutoController from "../../../../controllers/IControllers/Naruto/INarutoController";
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/', route);

    const ctrl = Container.get(config.controllers.naruto.naruto.name) as INarutoController;

    route.get('/', (req, res, next) => {
        console.log('Getting all naruto characters...');
        ctrl.getAllCharacters(req, res, next);
    });

    route.get('/:id', (req, res, next) => {
        console.log('Getting naruto character by id...');
        ctrl.getCharacterById(req, res, next);
    });

    route.get('/name/:name', (req, res, next) => {
        console.log('Getting naruto character by name...');
        ctrl.getCharacterByName(req, res, next);
    });

    route.delete('/:id', (req, res, next) => {
        console.log('Deleting naruto character by id...');
        ctrl.deleteCharacter(req, res, next);
    });

    route.post(
        '/',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                gender: Joi.string().valid('Male', 'Female', 'Other').required(),
                affiliation: Joi.array().items(Joi.string()).required(),
                jutsu_type: Joi.array().items(Joi.string()).required(),
                kekkei_genkai: Joi.array().items(Joi.string()).required(),
                nature_type: Joi.array().items(Joi.string()).required(),
                attribute: Joi.array().items(Joi.string()).required(),
                debut_arc: Joi.string().required(),
                vital_state: Joi.string().valid('Alive', 'Dead', 'Unknown').required(),
                occupation: Joi.array().items(Joi.string()).required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            console.log('Creating a new naruto character...');
            ctrl.saveCharacter(req, res, next);
        },
    );

    route.put(
        '/:id',
        celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                gender: Joi.string().valid('Male', 'Female', 'Other').required(),
                affiliation: Joi.array().items(Joi.string()).required(),
                jutsu_type: Joi.array().items(Joi.string()).required(),
                kekkei_genkai: Joi.array().items(Joi.string()).required(),
                nature_type: Joi.array().items(Joi.string()).required(),
                attribute: Joi.array().items(Joi.string()).required(),
                debut_arc: Joi.string().required(),
                vital_state: Joi.string().valid('Alive', 'Dead', 'Unknown').required(),
                occupation: Joi.array().items(Joi.string()).required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            console.log('Updating a naruto character...');
            ctrl.updateCharacter(req, res, next);
        },
    );
}