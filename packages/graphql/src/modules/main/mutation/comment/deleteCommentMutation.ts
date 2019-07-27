import Comment from "./../../../../model/comment";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import CommentType from "../../CommentType";

export default mutationWithClientMutationId({
  name: "deleteMyCommentMutation",
  inputFields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    idArticle: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ _id, idArticle }, context, options) => {
    // const idUser = context.user.id; <- o certo seria usar o id do user logado, mas estou colocando direto
    const comment = await Comment.deleteOne({ _id });
    const CommentUpdate = await Comment.find({ idArticle });
    if (comment) {
      return {
        success: "success",
        comment: CommentUpdate
      };
    }

    return {
      error: "Error in delete my an comment"
    };
  },
  outputFields: {
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    },
    comment: {
      type: new GraphQLList(CommentType),
      resolve: ({ comment }) => comment
    }
  }
});
