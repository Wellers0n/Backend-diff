import Article from "../models/article";
import Users from "../models/users";
import Comment from "../models/comment";
import { generateToken } from "./../auth";
import GetSlug from "./../helper/GetSlug";

/* USERS */

// login an user
export const loginUser = async ctx => {
  const { email, password } = ctx.request.body;
  let user = await Users.findOne({ email, password });
  if (user) {
    const id = user._id;
    let token = generateToken(id);
    ctx.body = { token };
  } else {
    ctx.status = 401;
  }
};

// create an user
export const createUser = async ctx => {
  const { name, email, password } = ctx.request.body;
  const user = await Users.findOne({ email });
  if (!user) {
    await Users.create({ name, email, password });
    return (ctx.status = 200);
  } else {
    ctx.status = 501;
  }
};

/* ARTICLES */

// find articles
export const FindArticles = async ctx => {
  const article = await Article.find({});
  ctx.body = article;
};

// find an article
export const FindOneArticles = async ctx => {
  const { id } = ctx.params;
  const article = await Article.findOne({ _id: id });
  ctx.body = article;
};

// create an article
export const CreateOneArticles = async ctx => {
  const { title, subtitle, description, author } = ctx.request.body;

  const idUser = ctx.state.user;
  const slug = GetSlug("articles", title);
  const date = Date.now();

  await Article.create({
    idUser,
    title,
    subtitle,
    description,
    author,
    date,
    date_update: null,
    slug
  });
  ctx.status = 200;
};

// delete an article
export const DeleteOneArticle = async ctx => {
  const { id } = ctx.params;
  await Article.deleteOne({ _id: id });
  ctx.status = 200;
};

// update an article
export const UpdateOneArticle = async ctx => {
  const { id } = ctx.params;
  const { title, subtitle, description } = ctx.request.body;
  const date = Date.now();
  await Article.updateOne(
    { _id: id },
    { title, subtitle, description, date_update: date }
  );
  ctx.status = 200;
};

/* COMMENTS */

// get a comment
export const GetComments = async ctx => {
  const { idArticle } = ctx.params;
  const { limit, skip } = ctx.query;
  const skipInt = Math.max(0, parseInt(skip));
  const limitInt = parseInt(limit)
  console.log(typeof limit, typeof skip)
  const comment = await Comment.find({ idArticle })
    .limit(limitInt)
    .skip(skipInt);

  return (ctx.body = comment);
};

// create a comment
export const CreateOneComment = async ctx => {
  const { username, description, idArticle } = ctx.request.body;
  const idUser = ctx.state.user;
  await Comment.create({
    idArticle,
    username,
    description,
    idUser
  });
  return (ctx.status = 200);
};

// create a update
export const UpdateOneComment = async ctx => {
  const { id, description } = ctx.request.body;
  await Comment.updateOne({ _id: id }, { description });
  return (ctx.status = 200);
};

// create a delete
export const DeleteOneComment = async ctx => {
  const { id } = ctx.request.body;
  await Comment.deleteOne({ _id: id });
  return (ctx.status = 200);
};