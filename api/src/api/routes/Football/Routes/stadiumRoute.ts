import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import {celebrate, Joi} from "celebrate";
import multer from "multer";
import IStadiumController from "../../../../controllers/IControllers/Football/IStadiumController";

const route = Router();

export default (app: Router) => {
    app.use('/stadium', route);

    const storage = multer.memoryStorage();
    const upload = multer({storage: storage});

    const ctrl = Container.get(config.controllers.football.stadium.name) as IStadiumController;

    route.post('/', upload.single('image'), celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            countryId: Joi.string().required(),
            location: Joi.string().required(),
            capacity: Joi.number().required(),
            surfaceType: Joi.string().required(),
            dimensions: Joi.string().required(),
            yearOpened: Joi.number().required()
        }),
    }), async (req, res, next) => {
        console.log('Saving stadium...');
        ctrl.saveStadium(req, res, next);
    });


}