import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./model.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://startmvv:kWIT16MWp0S8SpRY@cluster0.c7faolg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    app.get("/users", (req, res) => {
      UserModel.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(503).json("DB crush"));
    });

    app.post("/register", (req, res) => {
      UserModel.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.status(409).json(err));
    });

    app.post("/login", (req, res) => {
      const { email, password } = req.body;
      UserModel.findOne({ email: email }).then((user) => {
        if (user) {
          if (user.password === password) {
            res.json(user);
          } else {
            res.status(401).json("Wrong password");
          }
        } else {
            res.status(404).json("User doesn't exist");
        }
      });
    });

    app.delete("/user", (req, res) => {
      const { email } = req.body;
      UserModel.findOne({ email: email }).then((user) => {
        if (user) {
          UserModel.deleteOne({ email: email }).then(u => {
            console.log(u);
            res.json("User deleted");
          })
        } else {
            res.status(404).json("User doesn't exist");
        }
      });
    });

    app.listen(PORT, () => console.log(`server start on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
