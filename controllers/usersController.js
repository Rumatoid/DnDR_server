const postModel = require('../models/post');

class postController {
  index(req, res) {
    console.log('lol');
    postModel.find((err, posts) => {
      if (err) {
        res.send(err);
      } else {
        res.json(posts);
      }
    });
  }

  create(req, res) {
    const data = req.body;

    const post = new postModel({
      title: data.title,
      text: data.text
    });

    post.save().then(() => {
      res.send({ status: 'ok!' });
    });
  }

  read(req, res) {
    postModel.findOne({ _id: req.params.id }, (err, post) => {
      if (!post) {
        res.send({ error: err });
      } else {
        res.json(post);
      }
    });
  }

  update(req, res) {
    postModel.findByIdAndUpdate(req.params.id, { $set: req.body }, err => {
      if (err) {
        res.send(err);
      }

      res.send('updated');
    });
  }

  delete(req, res) {
    postModel.deleteOne({ _id: req.params.id }, err => {
      if (err) {
        res.send(err);
      }

      res.send('deleted');
    });
  }
}

module.exports = new postController();
