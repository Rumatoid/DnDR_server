const express = require('express'),
  router = express.Router(),
  postController = require('../controllers/usersController');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', postController.index);
router.post('/', postController.create);
router.get('/:id', postController.read);
router.delete('/:id', postController.delete);
router.put('/:id', postController.update);

module.exports = router;
