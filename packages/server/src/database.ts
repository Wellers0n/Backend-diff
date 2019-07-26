import mongoose from "mongoose";

export default function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on("error", error => reject(error))
      .on("close", () => console.log("Database connection closed."))
      .once("open", () => resolve(mongoose.connections[0]));

    mongoose.connect(
      "mongodb+srv://Wellerson:0000@cluster0-0bwqz.mongodb.net/blog?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    );
  });
}
