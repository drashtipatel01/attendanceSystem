// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     // first_name: { type: String, required: true },
//     // middle_name: { type: String },
//     // last_name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// // module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('User', userSchema, 'users');




const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // first_name: { type: String, required: true },
    // middle_name: { type: String },
    // last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Specify collection name explicitly
module.exports = mongoose.model('User', userSchema, 'users');
