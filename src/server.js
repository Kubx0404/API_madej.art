import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import loginRoute from "./routes/login.js";
import getRoute from "./routes/get.js";
import addRoute from "./routes/add.js";
import removeRoute from "./routes/remove.js";
import swapRoute from "./routes/swap.js";
import authRoute from "./routes/auth.js";
import logoutRoute from "./routes/logout.js";
import updateRoute from "./routes/update.js";
import requireAuth from "./lib/auth.js";

const app = express();
import dotenv from "dotenv";
dotenv.config();
const origin = process.env.CORS_ORIGIN;
const port = process.env.PORT || 3001;
const secret = process.env.SESSION_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

import cors from "cors";

app.use(
  cors({
    origin: origin,
    credentials: true,
  })
);

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    // store: new SequelizeStore({
    //   db: sequelize,
    // }),
  })
);

app.use("/api/photos/get", getRoute);
app.use("/api/login", loginRoute);
app.use("/api/auth", authRoute);
app.use("/api/logout", logoutRoute);

app.use(requireAuth());
app.use("/api/photos/add", addRoute);
app.use("/api/photos/remove", removeRoute);
app.use("/api/photos/swap", swapRoute);
app.use("/api/photos/update", updateRoute);

app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
