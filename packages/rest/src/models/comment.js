import mongoose from "mongoose";
const Schema = mongoose.Schema;

const comment = new Schema({
  username: {
    type: String,
    required: "name is required"
  },
  description: {
    type: String,
    required: "description is required"
  },
  idArticle: {
    type: String,
    required: "idArticle required"
  },
  idUser: {
    type: String,
    required: "idUser required"
  }
});

export default mongoose.model("comments", comment);
