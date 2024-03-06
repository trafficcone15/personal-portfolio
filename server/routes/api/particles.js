const express = require('express');
const router = express.Router();

const Particles = require('../../models/Particles');

router.get('/test', (req, res) => res.send('particle route testing!'));

router.get('/', (req, res) => {
    Particles.find()
        .then(particles => res.json(particles))
        .catch(err => res.status(404).json({ noparticlesfound: 'No Particles found' }));
});

router.get('/:id', (req, res) => {
    Particles.findById(req.params.id)
        .then(particles => res.json(particles))
        .catch(err => res.status(404).json({ noparticlesfound: 'No Particles found' }));
});

router.post('/', (req, res) => {
    Particles.create(req.body)
        .then(particles => res.json({ particle: particles, msg: 'Particle added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add this particle' }));
});

router.put('/:id', (req, res) => {
    Particles.findByIdAndUpdate(req.params.id, req.body)
        .then(particles => res.json({ msg: 'Updated successfully' }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});

router.delete('/:id', (req, res) => {
    Particles.findByIdAndDelete(req.params.id)
        .then(particles => res.json({ mgs: 'Particle deleted successfully' }))
        .catch(err => res.status(404).json({ error: 'No such a particle' }));
});

module.exports = router;