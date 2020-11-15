let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');

//*WORKOUT LOG CREATION
router.post('/', validateSession, (req, res) => {
    const logEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err }))
})

//*GET ALL ENTRIES
router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    Log.findAll({
        where: { owner_id: userid }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
})

//*GET INDIVIDUAL ENTRIES BY ID
router.get('/:id', validateSession, (req, res) => {
    let id = req.params.id;

    Log.findAll({
        where: { id: id }
    })
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err }))
});

//*UPDATE ENTRIES
router.put('/:id', validateSession, (req, res) => {
    const updateLogEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id}};

    Log.update(updateLogEntry, query)
        .then((logs) => res.status(200).json({
            updateLogEntry,
            message: "Log successfully updated"
        }))
        .catch((err) => res.status(500).json({ error: err }))
})

//*DELETE ENTRIES
router.delete('/:id', validateSession, (req, res) => {
    const query = { where: { id: req.params.id, owner_id: req.user.id}};

    Log.destroy(query)
        .then(() => res.status(200).json({ message: 'Entry Successfully Deleted'}))
        .catch((err) => res.status(500).json({ error: err }))
})

module.exports = router;