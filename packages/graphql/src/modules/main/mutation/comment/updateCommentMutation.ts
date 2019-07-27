import Comment from "./../../../../model/comment";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import CommentType from "../../CommentType";

export default mutationWithClientMutationId({
  name: "updateCommentMutation",
  inputFields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    idArticle: {
        type: new GraphQLNonNull(GraphQLString)
      }
  },
  mutateAndGetPayload: async (
    {  description, _id, idArticle },
    context,
    options
  ) => {
    const comment = await Comment.updateOne(
      { _id },
      { description }
    );

    const CommentUpdate = await Comment.find({idArticle});
    if (comment) {
      return {
        success: "success",
        comment: CommentUpdate
      };
    }
    return {
      error: "Error in update an comment"
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
