import {Router} from 'express';
import continent from './Routes/continentRoute';
import country from './Routes/countryRoute';
import image from './Routes/imageRoute';

export default () => {
    const app = Router();

    continent(app);
    country(app);
    image(app);

    return app
}