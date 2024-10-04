import {Router} from 'express';
import league from './Routes/leagueRoute';
import club from './Routes/clubRoute';

export default () => {
    const app = Router();

    league(app);
    club(app);

    return app
}