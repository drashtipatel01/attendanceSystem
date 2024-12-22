const fs = require('fs');
const path = './swagger_output.json';

const swaggerFile = require(path);
swaggerFile.host = process.env.HOST || 'localhost:5000';
fs.writeFileSync(path, JSON.stringify(swaggerFile, null, 2));
console.log(`Swagger host updated to: ${swaggerFile.host}`);
