
import express from 'express';
import connect from './db/connect.js';

import Grade from './models/grade.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const results = await Grade.find({ class_id: 311 }).limit(5);
  res.send(results);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  connect();
});



// import express from "express";

// const PORT = 5050;
// const app = express();

// import grades from "./routes/grades.mjs";
// import grades_agg from "./routes/grades_agg.mjs";
// // import connectToMongo from "./db/conn.mjs";

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Welcome to the API.");
// });

// app.use("/grades", grades);
// // app.use("/grades", grades_agg);

// // Global error handling
// app.use((err, _req, res, next) => {
//   res.status(500).send("Seems like we messed up somewhere...");
// });

// // Start the Express server
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
//   connectToMongo();
// });
