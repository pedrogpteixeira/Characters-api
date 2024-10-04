import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";
import ILeagueController from "../../../../controllers/IControllers/Football/ILeagueController";
import multer from "multer";
import IClubController from "../../../../controllers/IControllers/Football/IClubController";

const route = Router();

export default (app: Router) => {
    app.use('/club', route);

    const ctrl = Container.get(config.controllers.football.club.name) as IClubController;

    route.post('/', celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            leagueId: Joi.string().required(),
            numberOfPlayers: Joi.number().required(),
            trophies: Joi.number().required(),
            stadiumId: Joi.string().required(),
            foundationYear: Joi.number().required()
        })
    }), async (req, res, next) => {
        try {
            console.log('Saving club...');
            ctrl.saveClub(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/:id', async (req, res, next) => {
        try {
            console.log('Getting club...');
            ctrl.getClubById(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/name/:name', async (req, res, next) => {
        try {
            console.log('Getting club...');
            ctrl.getClubByName(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/country/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs...');
            ctrl.getClubsByCountryId(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/league/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs...');
            ctrl.getClubsByLeagueId(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/minus/:trophies', async (req, res, next) => {
        try {
            console.log('Getting clubs that has minus' + req.params.trophies + ' trophies...');
            ctrl.getClubsThatHasMinusThanXTrophies(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/more/:trophies', async (req, res, next) => {
        try {
            console.log('Getting clubs that has more than' + req.params.trophies + ' trophies...');
            ctrl.getClubsThatHasMoreThanXTrophies(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/:trophies', async (req, res, next) => {
        try {
            console.log('Getting clubs that has' + req.params.trophies + ' trophies...');
            ctrl.getClubsThatHasXTrophies(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/:trophies/country/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs that has' + req.params.trophies + ' trophies in ' + req.params.id + '...');
            ctrl.getClubsThatHasXTrophiesInCountry(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/more/:trophies/country/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs that has more than' + req.params.trophies + ' trophies in ' + req.params.id + '...');
            ctrl.getClubsThatHasMoreThanXTrophiesInCountry(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/minus/:trophies/country/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs that has minus' + req.params.trophies + ' trophies in ' + req.params.id + '...');
            ctrl.getClubsThatHasMinusThanXTrophiesInCountry(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/:trophies/league/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs that has' + req.params.trophies + ' trophies in ' + req.params.id + '...');
            ctrl.getClubsThatHasXTrophiesInLeague(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/more/:trophies/league/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs that has more than' + req.params.trophies + ' trophies in ' + req.params.id + '...');
            ctrl.getClubsThatHasMoreThanXTrophiesInLeague(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/trophies/minus/:trophies/league/:id', async (req, res, next) => {
        try {
            console.log('Getting clubs that has minus' + req.params.trophies + ' trophies in ' + req.params.id + '...');
            ctrl.getClubsThatHasMinusThanXTrophiesInLeague(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.get('/', async (req, res, next) => {
        try {
            console.log('Getting clubs...');
            ctrl.getAllClubs(req, res, next);
        } catch (e) {
            next(e);
        }
    });

    route.delete('/:id', async (req, res, next) => {
        try {
            console.log('Deleting club...');
            ctrl.deleteClub(req, res, next);
        } catch (e) {
            next(e);
        }
    });

}