import "@babel/polyfill";
import { createServer } from "http";
import app from "./app";
import connectDatabase from "./database";

(async () => {
  try {
    await connectDatabase();
  } catch (error) {
    console.log("Could not connect to database", { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(5001, () => {
    return console.log(
      `SERVER ON: http://localhost:${process.env.PORT || 5001}`
    );
  });
})();