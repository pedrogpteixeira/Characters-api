import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import multer from "multer";
import IImageController from "../../../../controllers/IControllers/Naruto/IImageController";

const route = Router();

export default (app: Router) => {
    app.use('/image', route);

    const storage = multer.memoryStorage();
    const upload = multer({storage: storage});

    const ctrl = Container.get(config.controllers.naruto.image.name) as IImageController;

    route.post('/', upload.single('image'), async (req, res, next) => {
        console.log('Uploading image...');
        ctrl.uploadImage(req, res, next);
    });

    route.get('/name/:name', async (req, res, next) => {
        console.log('Getting image by character name...');
        ctrl.getImageByName(req, res, next);
    });

    route.get('/character/:characterId', async (req, res, next) => {
        console.log('Getting image by character id...');
        ctrl.getImageByCharacterId(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting image by id...');
        ctrl.getImageById(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting image...');
        ctrl.deleteImage(req, res, next);
    });
}