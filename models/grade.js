import mongoose from 'mongoose';

// Define a schema
const gradeSchema = new mongoose.Schema({
  scores: [],
  class_id: {
    type: Number,
    required: true,
  },
  learner_id: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('grades', gradeSchema);
