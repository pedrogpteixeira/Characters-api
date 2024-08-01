import {Router} from 'express';
import continent from './Routes/continentRoute';
import country from './Routes/countryRoute';

export default () => {
    const app = Router();

    continent(app);
    country(app);

    return app
}