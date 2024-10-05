import {Router} from 'express';
import league from './Routes/leagueRoute';
import club from './Routes/clubRoute';
import stadium from './Routes/stadiumRoute';

export default () => {
    const app = Router();

    league(app);
    club(app);
    stadium(app);

    return app
}