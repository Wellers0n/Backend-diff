import Article from "./../../../../model/article";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import ArticleType from "../../ArticleType";

export default mutationWithClientMutationId({
  name: "deleteArticleMutation",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ id }, context, options) => {
    // const idUser = context.user.id;
    // const article = await Article.findOne({ name });
    // if (!idUser) return { error: "User null" };

    const article = await Article.deleteOne({ _id: id });

    const ArticleUpdate = await Article.find({});
    if (article) {
      return {
        success: "success",
        article: ArticleUpdate
      };
    }
    return {
      error: "Error in delete an article"
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
    article: {
      type: new GraphQLList(ArticleType),
      resolve: ({ article }) => article
    }
  }
});
