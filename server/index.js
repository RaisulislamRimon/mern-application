import express from "express";
import { createRequire } from "module";
import cors from "cors";
import morgan from "morgan";
import { MongoClient, ServerApiVersion } from "mongodb";
const require = createRequire(import.meta.url);
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";

require("dotenv").config();
dotenv.config();
// const env = dotenv.config();

const app = express();
// const port = import.meta.env.PORT || 5000;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// const MONGODB_URL = `mongodb://localhost:27017, {useNewUrlParser: true}`;
// const MONGODB_URL = `127.0.0.1`;
// const MONGODB_URL = `mongodb://localhost:27017/?directConnection=true`;
// const MONGODB_URL = `mongodb://localhost:27017`;

// const MONGODB_URL = `mongodb+srv://${process.env.VITE_USERNAME}:${process.env.VITE_PASSWORD}@cluster0.wnkrgxk.mongodb.net/?retryWrites=true&w=majority`;

// const client = new MongoClient(MONGODB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// const MONGODB_URL = `mongodb://localhost:27017/mern-app`;
const MONGODB_URL = `mongodb://127.0.0.1:27017/mern-app`;

//const client = new MongoClient(MONGODB_URL, {
// useNewUrlParser: true,
//  useUnifiedTopology: true,
// serverApi: ServerApiVersion.v1,
//});

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
    console.log(error.message);
  });

mongoose.set("strictQuery", false);
// mongoose.set("strictQuery", true);

// client.connect((err) => {
//   const collection = client.db("mern-app").collection("files");
//   // perform actions on the collection object
//   // client.close();
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", userRouter); // http://localhost:5000/users/signup

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
