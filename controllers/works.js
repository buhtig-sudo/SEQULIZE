const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Work, User } = require("../models");
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      console.log(SECRET);
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }

  next();
};
router.get("/", async (req, res) => {
  const works = await Work.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  res.json(works);
});
router.post("/", tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const work = await Work.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(work);
  } catch (error) {
    return res.status(400).json({ error });
  }
});
const workFinder = async (req, res, next) => {
  req.work = await Work.findByPk(req.params.id);
  next();
};
router.get("/:id", workFinder, async (req, res, next) => {
  Work.findByPk(req.params.id)
    .then((work) => {
      if (work) {
        console.log(JSON.stringify(work, null, 2));
        res.json(work);
      } else {
        res.status(404).send("Not Found id!");
      }
    })
    .catch((error) => next(error));
});

router.put("/:id", workFinder, async (req, res, next) => {
  Work.findByPk(req.params.id)
    .then((work) => {
      if (work) {
        work.author = req.body.author;
        work.title = req.body.title;
        work.likes = req.body.likes;
        work.save();
        res.json(work);
      } else {
        res.status(404).send("Id not found!");
      }
    })
    .catch((error) => next(error));
});
router.delete("/:id", workFinder, async (req, res, next) => {
  Work.findByPk(req.params.id)
    .then((work) => {
      if (work) {
        work.destroy().then(res.send("Element delete success!!"));
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = router;
