import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import IContinentController from "../../../../controllers/IControllers/World/IContinentController";
import {celebrate, Joi} from "celebrate";
import ICountryController from "../../../../controllers/IControllers/World/ICountryController";

const route = Router();

export default (app: Router) => {
    app.use('/country', route);

    const ctrl = Container.get(config.controllers.world.country.name) as ICountryController;

    route.post('/', celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            population: Joi.number().required(),
            continentId: Joi.string().required()
        }),
    }), async (req, res, next) => {
        console.log('Saving country...');
        ctrl.saveCountry(req, res, next);
    });

    route.get('/', async (req, res, next) => {
        console.log('Getting all countries...');
        ctrl.getAllCountries(req, res, next);
    });

    route.get('/name/:name', async (req, res, next) => {
        console.log('Getting country by name...');
        ctrl.getCountryByName(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting country by id...');
        ctrl.getCountryById(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting country...');
        ctrl.deleteCountry(req, res, next);
    });

    route.get('/continent/:continentId', async (req, res, next) => {
        console.log('Getting countries by continent...');
        ctrl.getCountriesByContinentId(req, res, next);
    });

    route.get("/continent/name/:name/", async (req, res, next) => {
        console.log('Getting countries by continent name...');
        ctrl.getCountriesByContinentName(req, res, next);
    });

}