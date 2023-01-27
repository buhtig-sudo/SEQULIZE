const router = require("express").Router();

const { Work } = require("../models");

router.get("/", async (req, res) => {
  const works = await Work.findAll();
  console.log(JSON.stringify(works, null, 2));
  res.json(works);
});

router.post("/", async (req, res) => {
  try {
    const work = await Work.create(req.body);
    return res.json(work);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
const workFinder = async (req, res, next) => {
  req.work = await Work.findByPk(req.params.id);
  next();
};
router.get("/:id", workFinder, async (req, res) => {
  const work = await Work.findByPk(req.params.id);
  if (work) {
    console.log(JSON.stringify(work, null, 2));
    res.json(work);
  } else {
    res.status(404).send("Not Found id!");
  }
});
router.put("/:id", workFinder, async (req, res) => {
  const work = await Work.findByPk(req.params.id);
  if (work) {
    work.author = req.body.author;
    work.title = req.body.title;
    work.likes = req.body.likes;
    await work.save();
    res.json(work);
  } else {
    res.status(404).send("Id not found!");
  }
});
router.delete("/:id", workFinder, async (req, res) => {
  const work = await Work.findByPk(req.params.id);
  if (work) {
    await work.destroy().then(res.send("Element delete success!!"));
  } else {
    res.status(404).end();
  }
});

module.exports = router;
