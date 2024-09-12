import express from "express";

import Grade from "../models/Grade.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await Grade.find({ class_id: 311 }).limit(5);
  res.send(results);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    let newDocument = req.body;

    if (newDocument.student_id) {
      newDocument.learner_id = newDocument.student_id;
      delete newDocument.student_id;
    }

    const result = await Grade.create(newDocument);
    res.send(result).status(204);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.patch("/:id/add", async (req, res) => {
  try {
    const result = await Grade.updateOne(
      { _id: req.params.id },
      { $push: { scores: req.body } }
    );

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/:id/remove", async (req, res) => {
  try {
    const result = await Grade.updateOne(
      { _id: req.params.id },
      { $pull: { scores: req.body } }
    );

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Grade.deleteOne({ _id: req.params.id });
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/student/:id", async (req, res) => {
  res.redirect(`/grades/learner/${req.params.id}`);
});

router.get("/learner/:id", async (req, res) => {
  try{
    let query = { learner_id: Number(req.params.id) };

    if (req.query.class) query.class_id = Number(req.query.class);

    const result = await Grade.find(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/learner/:id", async (req, res) => {
  try {
    let query = { learner_id: Number(req.params.id) };

    let result = await Grade.deleteMany(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.get("/class/:id", async (req, res) => {
  try {
    let query = { class_id: Number(req.params.id) };

    // Check for learner_id parameter
    if (req.query.learner) query.learner_id = Number(req.query.learner);

    let result = await Grade.find(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.patch("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  let result = await Grade.updateMany(query, {
    $set: { class_id: req.body.class_id }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.delete("/class/:id", async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  let result = await Grade.deleteMany(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
