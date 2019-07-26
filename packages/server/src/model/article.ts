import mongoose from "mongoose";
const Schema = mongoose.Schema;

const article = new Schema({
  idUser: {
    type: String,
    required: "idUser is requerid"
  },
  title: {
    type: String,
    required: "title is requerid"
  },
  subtitle: {
    type: String,
    required: "subtitle is requerid"
  },
  description: {
    type: String,
    required: "author is requerid"
  },
  author: {
    type: [String],
    required: "author is requerid"
  },
  date: {
    type: Date,
    default: Date.now,
  },
  date_update: {
    type: Date
  }
});

export default mongoose.model("articles", article);
