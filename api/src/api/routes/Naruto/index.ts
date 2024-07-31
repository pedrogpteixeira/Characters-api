import {Router} from 'express';
import image from './Routes/imageRoute';
import naruto from './Routes/narutoRoute';
import shadow from './Routes/shadowPictureRoute';
import jutsu from './Routes/jutsuRoute';
import eye from './Routes/eyePictureRoute';
import quote from './Routes/quoteRoute';

export default () => {
    const app = Router();

    naruto(app)
    image(app)
    shadow(app)
    jutsu(app)
    eye(app)
    quote(app)

    return app
}