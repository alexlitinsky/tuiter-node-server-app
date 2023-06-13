import mongoose from 'mongoose';
const tuitsSchema = mongoose.Schema({
  tuit: String,
  likes: Number,
  liked: Boolean,
  image: String,
  dislikes: Number,
  disliked: Boolean,
  topic: String,
  time: String,
  title: String,
  userName: String
}, { collection: 'tuits' });
export default tuitsSchema;
