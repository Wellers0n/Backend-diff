import Comment from "./../../../../model/comment";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import CommentType from "../../CommentType";

export default mutationWithClientMutationId({
  name: "createCommentMutation",
  inputFields: {
    idArticle: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async (
    { idArticle, name, description },
    context,
    options
  ) => {

    const comment = await Comment.create({
      idArticle,
      name,
      description
    });

    const CommentUpdate = await Comment.find({idArticle});
    if (comment) {
      return {
        success: "success",
        comment: CommentUpdate
      };
    }
    return {
      error: "Error in create an article"
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
