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

    const continentSchema = {
        name: 'continentSchema',
        schema: '../persistence/schemas/world/continentSchema',
    }

    const countrySchema = {
        name: 'countrySchema',
        schema: '../persistence/schemas/world/countrySchema',
    }

    const countryImageSchema = {
        name: 'countryImageSchema',
        schema: '../persistence/schemas/world/imageSchema',
    }

    const leagueSchema = {
        name: 'leagueSchema',
        schema: '../persistence/schemas/football/leagueSchema',
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

    const continentController = {
        name: config.controllers.world.continent.name,
        path: config.controllers.world.continent.path
    }

    const countryController = {
        name: config.controllers.world.country.name,
        path: config.controllers.world.country.path
    }

    const countryImageController = {
        name: config.controllers.world.country.image.name,
        path: config.controllers.world.country.image.path
    }

    const leagueController = {
        name: config.controllers.football.league.name,
        path: config.controllers.football.league.path
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

    const continentRepo = {
        name: config.repos.world.continent.name,
        path: config.repos.world.continent.path
    }

    const countryRepo = {
        name: config.repos.world.country.name,
        path: config.repos.world.country.path
    }

    const countryImageRepo = {
        name: config.repos.world.country.image.name,
        path: config.repos.world.country.image.path
    }

    const leagueRepo = {
        name: config.repos.football.league.name,
        path: config.repos.football.league.path
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

    const continentService = {
        name: config.services.world.continent.name,
        path: config.services.world.continent.path
    }

    const countryService = {
        name: config.services.world.country.name,
        path: config.services.world.country.path
    }

    const countryImageService = {
        name: config.services.world.country.image.name,
        path: config.services.world.country.image.path
    }

    const leagueService = {
        name: config.services.football.league.name,
        path: config.services.football.league.path
    }

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            narutoSchema,
            imageSchema,
            shadowPictureSchema,
            jutsuSchema,
            eyePictureSchema,
            quoteSchema,
            continentSchema,
            countrySchema,
            countryImageSchema,
            leagueSchema
        ],
        controllers: [
            narutoController,
            imageController,
            shadowPictureController,
            jutsuController,
            eyePictureController,
            quoteController,
            continentController,
            countryController,
            countryImageController,
            leagueController
        ],
        repos: [
            narutoRepo,
            imageRepo,
            shadowPictureRepo,
            jutsuRepo,
            eyePictureRepo,
            quoteRepo,
            continentRepo,
            countryRepo,
            countryImageRepo,
            leagueRepo
        ],
        services: [
            narutoService,
            imageService,
            shadowPictureService,
            jutsuService,
            eyePictureService,
            quoteService,
            continentService,
            countryService,
            countryImageService,
            leagueService
        ]
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({app: expressApp});
    Logger.info('✌️ Express loaded');
};
