// const swaggerAutogen = require('swagger-autogen')();

// const doc = {
//     info: {
//         title: 'Project APIs',
//         description: 'Automatically generated API documentation',
//     },
//     host: 'your-app-name.onrender.com',
//     schemes: ['https'],
// };

// const outputFile = './swagger_output.json';
// const endpointsFiles = ['./src/app.js']; // Add your main server file or an array of files

// swaggerAutogen(outputFile, endpointsFiles).then(() => {
//     require('./src/app.js'); // Start your server
// });


//new
const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
const HOST = process.env.HOST || `localhost:${PORT}`;

const doc = {
    info: {
        title: 'API Documentation',
        description: 'API for managing attendance records',
    },
    // host: process.env.HOST || 'localhost:5000',
    host: HOST,
    schemes: ['http', 'https'],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'JWT Authorization header using the Bearer scheme',
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
