const userModel = require('../models/user');

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

    user.save().then(() => {
      res.send(user._id);
    });
  }

  read(req, res) {
    userModel.findOne({ username: req.params.username }, (err, user) => {
      if (!user) {
        res.send({ error: err });
      } else {
        res.json(user);
      }
    });
  }

  update(req, res) {
    userModel.findOneAndUpdate(req.params.username, { $set: req.body }, err => {
      if (err) {
        res.send(err);
      }

      res.send('updated');
    });
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
