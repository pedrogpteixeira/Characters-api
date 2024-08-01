import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import IContinentController from "../../../../controllers/IControllers/World/IContinentController";
import {celebrate, Joi} from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use('/continent', route);

    const ctrl = Container.get(config.controllers.world.continent.name) as IContinentController;

    route.post('/', celebrate({
        body: Joi.object({
            name: Joi.string().required()
        }),
    }), async (req, res, next) => {
        console.log('Saving continent...');
        ctrl.saveContinent(req, res, next);
    });

    route.get('/', async (req, res, next) => {
        console.log('Getting all continents...');
        ctrl.getAllContinents(req, res, next);
    });

    route.get('/name/:name', async (req, res, next) => {
        console.log('Getting continent by name...');
        ctrl.getContinentByName(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting continent by id...');
        ctrl.getContinentById(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting continent...');
        ctrl.deleteContinent(req, res, next);
    });
}