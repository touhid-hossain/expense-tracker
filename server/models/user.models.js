const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    hashed_password: { type: String, required: true },
    image_url: { type: String },

});


module.exports = mongoose.model('user', UserSchema);