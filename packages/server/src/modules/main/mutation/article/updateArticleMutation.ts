import Article from "./../../../../model/article";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import ArticleType from "../../ArticleType";

export default mutationWithClientMutationId({
  name: "updateArticleMutation",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: GraphQLString
    },
    subtitle: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    date_update: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async (
    { title, subtitle, description, date_update, id },
    context,
    options
  ) => {
    const date = Date.now();
    const article = await Article.updateOne(
      { _id: id },
      { title, subtitle, description, date_update: date }
    );

    const ArticleUpdate = await Article.find({});
    if (article) {
      return {
        success: "success",
        article: ArticleUpdate
      };
    }
    return {
      error: "Error in update an article"
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
