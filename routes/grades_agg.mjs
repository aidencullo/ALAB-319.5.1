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
  try {
    const learnerId = Number(req.params.id);
    if (isNaN(learnerId)) return res.status(400).send("Invalid learner ID");

    const results = await Grade.find({ learner_id: learnerId });
    
    // Check if results are found
    if (results.length === 0) return res.status(404).send("Not found");

    const result = results.map(result => {
      const scores = {};

      // Accumulate scores by type
      result.scores.forEach(score => {
        if (!scores[score.type]) {
          scores[score.type] = [];
        }
        scores[score.type].push(score.score);
      });

      // Calculate average for each score type
      for (const key in scores) {
        const scoresArray = scores[key];
        scores[key] = scoresArray.reduce((total, val) => total + val, 0) / scoresArray.length;
      }

      // Calculate weighted average
      const avg = (scores.exam || 0) * 0.5 + (scores.quiz || 0) * 0.3 + (scores.homework || 0) * 0.2;

      return {
        class_id: result.class_id,
        ...scores,
        avg
      };
    });

    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
