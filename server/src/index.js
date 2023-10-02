const express = require('express');
const dotev = require('dotenv');
const cookieParser = require('cookie-parser');
dotev.config();
const cors = require('cors');
const db = require('./models');
const routes = require('./routes/index');


const app = express();


app.use(cors(
  {
    origin: true,
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

routes(app)

db.sequelize.sync().then(() => {
  app.listen(5000, async () => {
    console.log(`App listening at http://localhost:${5000}`)
  });
});
