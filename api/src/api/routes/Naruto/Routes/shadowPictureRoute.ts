import {Router} from "express";
import config from "../../../../../config";
import {Container} from "typedi";
import multer from "multer";
import IShadowPictureController from "../../../../controllers/IControllers/Naruto/IShadowPictureController";

const route = Router();

export default (app: Router) => {
    app.use('/shadow', route);

    const ctrl = Container.get(config.controllers.naruto.shadowPicture.name) as IShadowPictureController;

    const storage = multer.memoryStorage();
    const upload = multer({storage: storage});

    route.post('/', upload.single('shadow'), async (req, res, next) => {
        console.log('Uploading shadow picture...');
        ctrl.uploadImage(req, res, next);
    });

    route.get('/character/:characterId', async (req, res, next) => {
        console.log('Getting shadow picture by character id...');
        ctrl.getImageByCharacterId(req, res, next);
    });

    route.get('/:id', async (req, res, next) => {
        console.log('Getting shadow picture by id...');
        ctrl.getImageById(req, res, next);
    });

    route.delete('/:id', async (req, res, next) => {
        console.log('Deleting shadow picture...');
        ctrl.deleteImage(req, res, next);
    });
}