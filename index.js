const express = require('express'),
  http = require('http'),
  cors = require('cors'),
  mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());

const router = require('./routes/router');
app.use(router);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/DnD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

require('./socket.io/index')(server);

server.listen(PORT, () => console.log(`Server has start on port ${PORT}`));
