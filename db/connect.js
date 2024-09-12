import mongoose from 'mongoose';
import 'dotenv/config';

const CONNECTION_URL = process.env.ATLAS_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
