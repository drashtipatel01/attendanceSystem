const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `localhost:${PORT}`;

const doc = {
    info: {
        title: 'API Documentation',
        description: 'API for managing attendance records',
    },
    host: HOST,
    schemes: ['http', 'https'],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'JWT Authorization header. Example: Bearer <token>',
        },
    },
    security: [
        {
            Bearer: [],
        },
    ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
