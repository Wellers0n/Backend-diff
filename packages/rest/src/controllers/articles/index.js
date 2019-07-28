import Article from "./../../models/article";
import GetSlug from "./../../helper/GetSlug";
/* ARTICLES */

// find articles
export const FindArticles = async ctx => {
    const { limit, skip } = ctx.query;
    const skipInt = Math.max(0, parseInt(skip));
    const limitInt = parseInt(limit);
    const article = await Article.find({})
      .limit(limitInt)
      .skip(skipInt);
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
  
  /* PRMALINK */
export const Permalink = async ctx => {
  const { slug } = ctx.query;
  const article = await Article.findOne({ slug });
  return ctx.body = article
};
