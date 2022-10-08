const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

const verifyToken = require('../middlewares/verifyToken');

router
    .get('/?', characterController.search)
    .post('/create', verifyToken, characterController.create)
    .put('/update/:id', verifyToken, characterController.update)
    .delete('/delete/:id', verifyToken, characterController.delete)

module.exports = router;