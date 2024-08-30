import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";
import ILeagueController from "../../../../controllers/IControllers/Football/ILeagueController";

const route = Router();

export default (app: Router) => {
    app.use('/football', route);

    const ctrl = Container.get(config.controllers.football.league.name) as ILeagueController;

    route.post('/', celebrate({
        body: Joi.object({
            name: Joi.string().required()
        }),
    }), async (req, res, next) => {
        console.log('Saving football...');
        ctrl.saveLeague(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting football by id...');
        ctrl.getLeagueById(req, res, next);
    });

    route.get('/name/:name', async (req, res, next) => {
        console.log('Getting football by name...');
        ctrl.getLeagueByName(req, res, next);
    });

    route.get('/country/:country', async (req, res, next) => {
        console.log('Getting leagues by country...');
        ctrl.getLeagueByCountry(req, res, next);
    });

    route.get('/minus/:teams', async (req, res, next) => {
        console.log('Getting leagues that have less than' + req.params.teams + ' teams...');
        ctrl.getLeagueThatHasMinusXTeams(req, res, next);
    });

    route.get('/more/:teams', async (req, res, next) => {
        console.log('Getting leagues that have more than' + req.params.teams + ' teams...');
        ctrl.getLeagueThatHasMoreThanXTeams(req, res, next);
    });

    route.get('/', async (req, res, next) => {
        console.log('Getting all leagues...');
        ctrl.getAllLeagues(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting football...');
        ctrl.deleteLeague(req, res, next);
    });

}