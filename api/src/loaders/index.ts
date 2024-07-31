import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({expressApp}) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    const narutoSchema = {
        name: 'narutoSchema',
        schema: '../persistence/schemas/naruto/narutoSchema',
    }

    const imageSchema = {
        name: 'imageSchema',
        schema: '../persistence/schemas/naruto/imageSchema',
    }

    const shadowPictureSchema = {
        name: 'shadowPictureSchema',
        schema: '../persistence/schemas/naruto/shadowPictureSchema',
    }

    const jutsuSchema = {
        name: 'jutsuSchema',
        schema: '../persistence/schemas/naruto/jutsuSchema',
    }

    const eyePictureSchema = {
        name: 'eyePictureSchema',
        schema: '../persistence/schemas/naruto/eyePictureSchema',
    }

    const quoteSchema = {
        name: 'quoteSchema',
        schema: '../persistence/schemas/naruto/quoteSchema',
    }

    const narutoController = {
        name: config.controllers.naruto.naruto.name,
        path: config.controllers.naruto.naruto.path
    }

    const imageController = {
        name: config.controllers.naruto.image.name,
        path: config.controllers.naruto.image.path
    }

    const shadowPictureController = {
        name: config.controllers.naruto.shadowPicture.name,
        path: config.controllers.naruto.shadowPicture.path
    }

    const eyePictureController = {
        name: config.controllers.naruto.eyePicture.name,
        path: config.controllers.naruto.eyePicture.path
    }

    const jutsuController = {
        name: config.controllers.naruto.jutsu.name,
        path: config.controllers.naruto.jutsu.path
    }

    const quoteController = {
        name: config.controllers.naruto.quote.name,
        path: config.controllers.naruto.quote.path
    }

    const narutoRepo = {
        name: config.repos.naruto.naruto.name,
        path: config.repos.naruto.naruto.path
    }

    const imageRepo = {
        name: config.repos.naruto.image.name,
        path: config.repos.naruto.image.path
    }

    const shadowPictureRepo = {
        name: config.repos.naruto.shadowPicture.name,
        path: config.repos.naruto.shadowPicture.path
    }

    const eyePictureRepo = {
        name: config.repos.naruto.eyePicture.name,
        path: config.repos.naruto.eyePicture.path
    }

    const jutsuRepo = {
        name: config.repos.naruto.jutsu.name,
        path: config.repos.naruto.jutsu.path
    }

    const quoteRepo = {
        name: config.repos.naruto.quote.name,
        path: config.repos.naruto.quote.path
    }

    const narutoService = {
        name: config.services.naruto.naruto.name,
        path: config.services.naruto.naruto.path
    }

    const imageService = {
        name: config.services.naruto.image.name,
        path: config.services.naruto.image.path
    }

    const shadowPictureService = {
        name: config.services.naruto.shadowPicture.name,
        path: config.services.naruto.shadowPicture.path
    }

    const eyePictureService = {
        name: config.services.naruto.eyePicture.name,
        path: config.services.naruto.eyePicture.path
    }

    const jutsuService = {
        name: config.services.naruto.jutsu.name,
        path: config.services.naruto.jutsu.path
    }

    const quoteService = {
        name: config.services.naruto.quote.name,
        path: config.services.naruto.quote.path
    }

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            narutoSchema,
            imageSchema,
            shadowPictureSchema,
            jutsuSchema,
            eyePictureSchema,
            quoteSchema
        ],
        controllers: [
            narutoController,
            imageController,
            shadowPictureController,
            jutsuController,
            eyePictureController,
            quoteController
        ],
        repos: [
            narutoRepo,
            imageRepo,
            shadowPictureRepo,
            jutsuRepo,
            eyePictureRepo,
            quoteRepo
        ],
        services: [
            narutoService,
            imageService,
            shadowPictureService,
            jutsuService,
            eyePictureService,
            quoteService
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
};
