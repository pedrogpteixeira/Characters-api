import {Router} from 'express';
import league from './Routes/leagueRoute';

export default () => {
    const app = Router();

    league(app);

    return app
}