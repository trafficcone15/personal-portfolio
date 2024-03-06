const mongoose = require('mongoose');

const ParticlesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = Particles = mongoose.model('ParticleBoard', ParticlesSchema, 'ParticleBoard');