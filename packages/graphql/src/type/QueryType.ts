import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from "graphql";
import ArticleType from "../modules/main/ArticleType";
import CommentType from './../modules/main/CommentType'
import articleModel from "../model/article";
import commentModel from "../model/comment"

export default new GraphQLObjectType({
  name: "QueryType",
  description: "Get planets[] and planet",
  fields: () => ({
    article: {
      type: ArticleType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (parentValue, args, ctx) => {
        return articleModel.findOne({ _id: args.id });
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve: (parentValue, args, ctx) => {
        // const idUser = ctx.user.id;
        return articleModel.find({}) ;
      } 
    },
    // myArticles: {
    //   type: new GraphQLList(ArticleType),
    //   resolve: (parentValue, args, ctx) => {
    //     // const idUser = ctx.user.id;
    //     return ctx.user ? articleModel.find({idUser}) : null;
    //   }
    // },
    comments: {
      type: new GraphQLList(CommentType),
      args: {
        idArticle: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (parentValue, args, ctx) => {
        const idArticle = args.idArticle;
        return commentModel.find({idArticle}) ;
      }
    }
  })
});
