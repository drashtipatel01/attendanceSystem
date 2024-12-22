const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

app.use(bodyParser.json());

app.use('/api', authRoutes);

app.use('/api', attendanceRoutes);
app.get('/api', (req, res) => {
    res.send('You are connected to server');
});
const PORT = process.env.PORT || 5000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${5000}/api-docs`);

});
