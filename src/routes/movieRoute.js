const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');

router
    .get('/?', movieController.search)
    .post('/create', verifyToken, movieController.create)
    .put('/update/:id', verifyToken ,movieController.update)
    .delete('/delete/:id', verifyToken, movieController.delete)

module.exports = router