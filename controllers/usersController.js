const userModel = require('../models/user');
const jwt = require('jsonwebtoken');

class userController {
  index(req, res) {
    userModel.find((err, users) => {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    });
  }

  create(req, res) {
    const data = req.body;

    const user = new userModel({
      username: data.username,
      password: data.password
    });

    userModel.findOne({ username: data.username }, (err, userFind) => {
      if (!userFind) {
        user.save();
        res.json(null);
      } else {
        res.json(user);
      }
    });
  }

  login(req, res) {
    userModel.findOne({ username: req.params.username }, (err, user) => {
      if (!user) {
        res.send({ error: err });
      } else {
        const token = jwt.sign(user.username, 'Rumatoid');

        res.json({ user, token });
      }
    });
  }

  checkToken(req, res) {
    try {
      const username = jwt.verify(req.params.token, 'Rumatoid');
      userModel.findOne({ username }, (err, user) => {
        if (!user) {
          res.send({ error: err });
        } else {
          res.json(user);
        }
      });
    } catch (err) {
      res.json(undefined);
    }
  }

  update(req, res) {
    userModel.findOneAndUpdate(
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
    userModel.deleteOne({ username: req.params.username }, err => {
      if (err) {
        res.send(err);
      }

      res.send('deleted');
    });
  }
}

module.exports = new userController();
