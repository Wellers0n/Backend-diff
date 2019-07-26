import Article from "./../../../../model/article";
import { GraphQLString, GraphQLNonNull, GraphQLList } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";
import ArticleType from "../../ArticleType";


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
    date: {
      type: new GraphQLNonNull(GraphQLString)
    },
    date_update: {
      type: GraphQLString
    }
  },
  mutateAndGetPayload: async (
    { idUser, title, subtitle, description, author, date, date_update },
    context,
    options
  ) => {
    // const idUser = context.user.id;
    // const article = await Article.findOne({ name });
    // if (!idUser) return { error: "User null" };

    const article = await Article.create({
      idUser,
      title,
      subtitle,
      description,
      author,
      date,
      date_update
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
