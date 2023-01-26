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
    // underscored: false,
    timestamps: false,
    modelName: "work",
  }
);

app.get("/api/notes", async (req, res) => {
  const work = await Work.findAll();
  res.json(work);
});
app.post("/api/notes", async (req, res) => {
  try {
    const note = await Work.create(req.body);
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
