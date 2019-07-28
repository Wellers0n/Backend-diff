import Router from "koa-router";
import {
  loginUser,
  createUser,
} from "../controllers/users";
import {
  CreateOneComment,
  GetComments,
  DeleteOneComment,
  UpdateOneComment
} from "../controllers/comments";
import {
  CreateOneArticles,
  DeleteOneArticle,
  FindArticles,
  FindOneArticles,
  UpdateOneArticle,
  Permalink
} from "../controllers/articles";

import { authMiddleware } from "./../auth";

const router = new Router();

// create user and login
router.post("/api/login", loginUser);
router.post("/api/createUser", createUser);
// articles
router.get("/api/articles", authMiddleware, FindArticles);
router.get("/api/article/:id", authMiddleware, FindOneArticles);
router.post("/api/article", authMiddleware, CreateOneArticles);
router.delete("/api/article/:id", authMiddleware, DeleteOneArticle);
router.put("/api/article/:id", authMiddleware, UpdateOneArticle);
// comments
router.get("/api/comment/:idArticle", authMiddleware, GetComments);
router.post("/api/comment", authMiddleware, CreateOneComment);
router.put("/api/comment", authMiddleware, UpdateOneComment);
router.delete("/api/comment/:id", authMiddleware, DeleteOneComment);

//permalink
router.get("/api/permalink", authMiddleware, Permalink);

export default router.routes();
