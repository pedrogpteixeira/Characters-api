import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import multer from "multer";
import IEyePictureController from "../../../../controllers/IControllers/Naruto/IEyePictureController";

const route = Router();

export default (app: Router) => {
    app.use('/eye', route);

    const ctrl = Container.get(config.controllers.naruto.eyePicture.name) as IEyePictureController;

    const storage = multer.memoryStorage();
    const upload = multer({storage: storage});

    route.post('/', upload.single('eye'), async (req, res, next) => {
        console.log('Uploading eye picture...');
        ctrl.uploadImage(req, res, next);
    });

    route.get('/character/:characterId', async (req, res, next) => {
        console.log('Getting eye picture by character id...');
        ctrl.getImageByCharacterId(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting eye picture by id...');
        ctrl.getImageById(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting eye picture...');
        ctrl.deleteImage(req, res, next);
    });
}