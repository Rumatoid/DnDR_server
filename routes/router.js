const express = require('express');
const router = express.Router();

const usersRoutes = require('./users.routes');
const charactersRoutes = require('./characters.routes');

router.use('/users', usersRoutes);
router.use('/characters', charactersRoutes);

router.get('/', (req, res) => {
  res.send('server is up and runnig');
});

module.exports = router;
