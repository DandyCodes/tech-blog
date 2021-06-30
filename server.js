require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelizeConnection = require("./config/connection");

const app = express();
const port = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET
    ? process.env.SESSION_SECRET
    : "d5r65f798uyivbhi8o5tf=-[p0o;lzxfwj",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelizeConnection,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelizeConnection.sync({ force: false }).then(() => {
  app.listen(port, () => console.log("Listening on port", port));
});
