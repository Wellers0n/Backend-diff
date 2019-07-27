import Router from "koa-router";
import {
  FindArticles,
  loginUser,
  createUser,
  FindOneArticles,
  DeleteOneArticle,
  UpdateOneArticle,
  CreateOneArticles,
  CreateOneComment,
  UpdateOneComment,
  DeleteOneComment,
  GetComments
} from "../controllers/blog";
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
router.delete("/api/comment", authMiddleware, DeleteOneComment);







export default router.routes();