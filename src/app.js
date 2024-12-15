// const express = require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const attendanceRoutes = require('./routes/attendanceRoutes');

// dotenv.config();

// const app = express();
// connectDB();

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/attendance', attendanceRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });




const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const attendanceRoutes = require('./routes/attendanceRoutes');
const authRoutes = require('./routes/authRoutes'); // Import Auth routes

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Route for authentication (register and login)
app.use('/api/auth', authRoutes);

// Route for attendance (punch-in and attendance records)
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
