import express from "express";
import Grade from "../models/Grade.js";

const router = express.Router();

/**
 * It is not best practice to seperate these routes
 * like we have done here. This file was created
 * specifically for educational purposes, to contain
 * all aggregation routes in one place.
 */

/**
 * Grading Weights by Score Type:
 * - Exams: 50%
 * - Quizes: 30%
 * - Homework: 20%
 */

router.get("/learner/:id/avg-class", async (req, res) => {
  const query = {
    learner_id: Number(req.params.id),
  };
  const results = await Grade.find(query);
  const result = results.map(result => {
    const scores = {}
    result.scores.forEach(score => {
      scores[score.type] = (scores[score.type] || []).concat([score.score]);
    })
    Object.keys(scores).map(key => {
      scores[key] = scores[key].reduce((total, val) => total + val, 0) / scores[key].length;
    })
    return {
      class_id: result.class_id,
      ...scores,
      avg: (scores.exam * 0.5) + (scores.quiz * 0.3) + (scores.homework * 0.2)
    }
  })

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
