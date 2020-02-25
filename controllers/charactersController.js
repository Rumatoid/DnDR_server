const characterModel = require('../models/character');

class characterController {
  index(req, res) {
    characterModel.find((err, users) => {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    });
  }

  create(req, res) {
    const character = new characterModel({
      name: Math.random(),
      username: req.params.username
    });

    character.save().then(resp => {
      res.json(character._id);
    });
  }

  getNames(req, res) {
    characterModel.find(
      { username: req.params.username },
      (err, characters) => {
        if (!characters) {
          res.send({ error: err });
        } else {
          let result = [];
          characters.map(character => {
            result.push(character.name);
          });
          res.json(result);
        }
      }
    );
  }

  update(req, res) {
    characterModel.findOneAndUpdate(
      { username: req.params.username },
      { $set: req.body },
      err => {
        if (err) {
          res.send(err);
        }

        res.send('updated');
      }
    );
  }

  delete(req, res) {
    characterModel.deleteOne({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }

      res.send('deleted');
    });
  }
}

module.exports = new characterController();
