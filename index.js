require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Work extends Model {}
Work.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    likes: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "work",
  }
);

Work.sync();

app.get("/api/works", async (req, res) => {
  const works = await Work.findAll();
  console.log(JSON.stringify(works, null, 2));
  res.json(works);
});

app.use(express.json());

app.post("/api/works", async (req, res) => {
  try {
    const work = await Work.create(req.body);
    return res.json(work);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/api/works/:id", async (req, res) => {
  const work = await Work.findByPk(req.params.id);
  if (work) {
    console.log(JSON.stringify(work, null, 2));
    res.json(work);
  } else {
    res.status(404).then(res.send("Not Found id!"));
  }
});
app.put("/api/works/:id", async (req, res) => {
  const work = await Work.findByPk(req.params.id);
  if (work) {
    work.author = req.body.author;
    work.title = req.body.title;
    await work.save();
    res.json(work);
  } else {
    res.status(404).end();
  }
});
app.delete("/api/works/:id", async (req, res) => {
  const work = await Work.findByPk(req.params.id);
  if (work) {
    await work.destroy().then(res.send("Element delete success!!"));
  } else {
    res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
