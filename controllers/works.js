const router = require("express").Router();

const { Work } = require("../models");

router.get("/", async (req, res, next) => {
  Work.findAll()
    .then((work) => {
      console.log(JSON.stringify(work, null, 2));
      res.json(work);
    })
    .catch((error) => next(error));
});

router.post("/", async (req, res, next) => {
  Work.create(req.body)
    .then((work) => {
      return res.json(work);
    })
    .catch((error) => next(error));
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
