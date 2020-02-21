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
      res.send({ status: 'ok!' });
    });
  }

  read(req, res) {
    userModel.findOne({ _id: req.params.id }, (err, user) => {
      if (!user) {
        res.send({ error: err });
      } else {
        res.json(user);
      }
    });
  }

  update(req, res) {
    userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, err => {
      if (err) {
        res.send(err);
      }

      res.send('updated');
    });
  }

  delete(req, res) {
    userModel.deleteOne({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }

      res.send('deleted');
    });
  }
}

module.exports = new userController();
