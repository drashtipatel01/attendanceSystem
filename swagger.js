const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project APIs',
        description: 'Automatically generated API documentation',
    },
    host: 'your-app-name.onrender.com',
    schemes: ['https'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/app.js']; // Add your main server file or an array of files

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./src/app.js'); // Start your server
});
