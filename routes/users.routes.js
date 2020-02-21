const express = require('express'),
  router = express.Router(),
  usersController = require('../controllers/usersController');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', usersController.index);
router.post('/', usersController.create);
router.get('/:id', usersController.read);
router.delete('/:id', usersController.delete);
router.put('/:id', usersController.update);

module.exports = router;
