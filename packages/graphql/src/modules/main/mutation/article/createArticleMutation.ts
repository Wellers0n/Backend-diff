import Article from "./../../../../model/article";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import ArticleType from "../../ArticleType";
import GetSlug from './../../../helper/GetSlug'

export default mutationWithClientMutationId({
  name: "createArticleMutation",
  inputFields: {
    idUser: {
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    subtitle: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    author: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString))
    },
  },
  mutateAndGetPayload: async (
    { idUser, title, subtitle, description, author },
    context,
    options
  ) => {
    // permalink and slug
    const slug = GetSlug("articles", title)
    console.log(slug)
    const date = Date.now();

    const article = await Article.create({
      idUser,
      title,
      subtitle,
      description,
      author,
      date,
      date_update: null,
      slug
    });
    
    const ArticleUpdate = await Article.find({});
    if (article) {
      return {
        success: "success",
        article: ArticleUpdate
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
    article: {
      type: new GraphQLList(ArticleType),
      resolve: ({ article }) => article
    }
  }
});
