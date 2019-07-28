import Comment from "./../../models/comment";
/* COMMENTS */

// get a comment
export const GetComments = async ctx => {
    const { idArticle } = ctx.params;
    const { limit, skip } = ctx.query;
    const skipInt = Math.max(0, parseInt(skip));
    const limitInt = parseInt(limit);
  
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