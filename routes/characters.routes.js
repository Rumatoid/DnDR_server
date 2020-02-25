const express = require('express'),
  router = express.Router(),
  charactersController = require('../controllers/charactersController');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', charactersController.index);
router.post('/:username', charactersController.create);
router.get('/:username', charactersController.getNames);
router.delete('/:id', charactersController.delete);

//TODO переделать функции!
// router.post('/:username', charactersController.login);
// router.put('/:username', charactersController.update);

module.exports = router;
