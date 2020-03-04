const express = require('express'),
  router = express.Router(),
  charactersController = require('../controllers/charactersController');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', charactersController.index);
router.post('/:username', charactersController.create);
router.get('/:username', charactersController.getNames);
router.delete('/:id', charactersController.delete);

module.exports = router;
