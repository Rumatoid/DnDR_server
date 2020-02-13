const express = require('express');
const router = express.Router();

const postController = require('../controllers/usersController');

const usersRoutes = require('./users.routes');

router.use('/posts', usersRoutes);

router.get('/', (req, res) => {
  res.send('server is up and runnig');
});

module.exports = router;
