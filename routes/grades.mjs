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

// // Remove a score from a grade entry
// router.patch("/:id/remove", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $pull: { scores: req.body }
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a single grade entry
// router.delete("/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: ObjectId(req.params.id) };
//   let result = await collection.deleteOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Get route for backwards compatibility
// router.get("/student/:id", async (req, res) => {
//   res.redirect(`learner/${req.params.id}`);
// });

// // Get a learner's grade data
// router.get("/learner/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };

//   // Check for class_id parameter
//   if (req.query.class) query.class_id = Number(req.query.class);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a learner's grade data
// router.delete("/learner/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };

//   let result = await collection.deleteOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Get a class's grade data
// router.get("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   // Check for learner_id parameter
//   if (req.query.learner) query.learner_id = Number(req.query.learner);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Update a class id
// router.patch("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.updateMany(query, {
//     $set: { class_id: req.body.class_id }
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a class
// router.delete("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.deleteMany(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

export default router;
