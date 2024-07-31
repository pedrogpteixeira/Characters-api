import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your favorite port : optional change to 4000 by JRT
     */
    port: parseInt(process.env.PORT, 10) || 3000,

    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI || "mongodb://vsgate-s1.dei.isep.ipp.pt:10239",
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

    /**
     * Database user and password
     */
    dbUser: process.env.DB_USER || "mongoadmin",
    dbPassword: process.env.DB_PASS || "8733cb24de0d761e17b6593d",

    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },

    /**
     * API configs
     */
    prefix: {
        naruto: '/naruto',
    },

    controllers: {
        naruto: {
            naruto: {
                name: "NarutoController",
                path: "../controllers/Naruto/narutoController"
            },
            image: {
                name: "ImageController",
                path: "../controllers/Naruto/imageController"
            },
            shadowPicture: {
                name: "ShadowPictureController",
                path: "../controllers/Naruto/shadowPictureController"
            },
            jutsu: {
                name: "JutsuController",
                path: "../controllers/Naruto/jutsuController"
            },
            eyePicture: {
                name: "EyePictureController",
                path: "../controllers/Naruto/eyePictureController"
            },
            quote: {
                name: "QuoteController",
                path: "../controllers/Naruto/quoteController"
            }
        }
    },

    repos: {
        naruto: {
            naruto: {
                name: "NarutoRepo",
                path: "../repos/naruto/narutoRepo"
            },
            image: {
                name: "ImageRepo",
                path: "../repos/naruto/imageRepo"
            },
            shadowPicture: {
                name: "ShadowPictureRepo",
                path: "../repos/naruto/shadowPictureRepo"
            },
            jutsu: {
                name: "JutsuRepo",
                path: "../repos/naruto/jutsuRepo"
            },
            eyePicture: {
                name: "EyePictureRepo",
                path: "../repos/naruto/eyePictureRepo"
            },
            quote: {
                name: "QuoteRepo",
                path: "../repos/naruto/quoteRepo"
            }
        }
    },

    services: {
        naruto: {
            naruto: {
                name: "NarutoService",
                path: "../services/naruto/narutoService"
            },
            image: {
                name: "ImageService",
                path: "../services/naruto/imageService"
            },
            shadowPicture: {
                name: "ShadowPictureService",
                path: "../services/naruto/shadowPictureService"
            },
            jutsu: {
                name: "JutsuService",
                path: "../services/naruto/jutsuService"
            },
            eyePicture: {
                name: "EyePictureService",
                path: "../services/naruto/eyePictureService"
            },
            quote: {
                name: "QuoteService",
                path: "../services/naruto/quoteService"
            }
        }
    }
};
