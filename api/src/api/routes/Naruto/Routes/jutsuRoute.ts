import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import multer from "multer";
import IJutsuController from "../../../../controllers/IControllers/Naruto/IJutsuController";

const route = Router();

export default (app: Router) => {
    app.use('/jutsu', route);

    const ctrl = Container.get(config.controllers.naruto.jutsu.name) as IJutsuController;

    const storage = multer.memoryStorage();
    const upload = multer({storage: storage});

    route.post('/', upload.single('video'), async (req, res, next) => {
        console.log('Uploading jutsu video...');
        ctrl.uploadVideo(req, res, next);
    });

    route.get('/character/:characterId', async (req, res, next) => {
        console.log('Getting jutsus by character id...');
        ctrl.getJutsusByCharacterId(req, res, next);
    });

    route.get('/name/:name', async (req, res, next) => {
        console.log('Getting jutsu by name...');
        ctrl.getVideoByName(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting jutsu by id...');
        ctrl.getVideoById(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting shadow picture...');
        ctrl.deleteVideo(req, res, next);
    });
}