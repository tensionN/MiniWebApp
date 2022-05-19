const express = require('express');
const router = express.Router();

const monk = require('monk');
const db = monk('localhost:27017/vidzy');

router.get('/', (req, res) => {
    const collection = db.get('videos');
    collection.find({}, (err, videos) => {
        if (err) throw err;
        res.json(videos);
    });
});

router.post('/', (req, res) => {
    const collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, (err, video) => {
        if (err) throw err;
        res.json(video);
    })
})

router.get('/:id', (req, res) => {
    const collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, (err, video) => {
        if (err) throw err;
        res.json(video);
    });
});

router.put('/:id', (req, res) => {
    const collection = db.get('videos');
    collection.update({
        _id: req.params.id
    }, {
        $set: {
            title: req.body.title,
            description: req.body.description
        }
    }, (err, video) => {
        if (err) throw err;
        res.json(video);
    });
});

router.delete('/:id', (req, res) => {
    const collection = db.get('videos');
    collection.remove({_id: req.params.id}, (err, video) => {
        if (err) throw err;
        res.json(video);
    })
})

module.exports = router;