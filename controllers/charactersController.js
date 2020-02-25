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
      name: 'New Character',
      username: req.params.username
    });

    character.save().then(resp => {
      res.json({ name: character.name, id: character._id });
    });
  }

  getNames(req, res) {
    characterModel.find(
      { username: req.params.username },
      (err, characters) => {
        if (!characters) {
          res.send({ error: err });
        } else {
          let arrToSend = [];
          characters.map(character => {
            arrToSend.push({ name: character.name, id: character._id });
          });
          res.json(arrToSend);
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
        return 0;
      }

      res.send('deleted');
    });
  }
}

module.exports = new characterController();
