const express = require('express'),
  router = express.Router(),
  usersController = require('../controllers/usersController');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', usersController.index);
router.post('/', usersController.create);
router.get('/:username', usersController.read);
router.delete('/:username', usersController.delete);
router.put('/:username', usersController.update);

module.exports = router;
