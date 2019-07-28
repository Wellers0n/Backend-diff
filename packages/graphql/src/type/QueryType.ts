import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from "graphql";
import ArticleType from "../modules/main/ArticleType";
import CommentType from './../modules/main/CommentType'
import articleModel from "../model/article";
import commentModel from "../model/comment";
import Slugify from './../modules/helper/Slugify'

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
      args: {
        skip: {
          type: GraphQLInt
        },
        limit: {
          type: GraphQLInt
        }
      },
      resolve: (parentValue, args, ctx) => {
        // const idUser = ctx.user.id;
        const limit = args.limit
        const skip = Math.max(0, args.skip)
        return articleModel.find({}).limit(limit).skip(skip) ;
      } 
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: {
        idArticle: {
          type: new GraphQLNonNull(GraphQLID)
        },
        skip: {
          type: GraphQLInt
        },
        limit: {
          type: GraphQLInt
        }
      },
      resolve: (parentValue, args, ctx) => {
        const limit = args.limit
        const skip = Math.max(0, args.skip)
        const idArticle = args.idArticle;
        return commentModel.find({idArticle}).limit(limit).skip(skip) ;
      }
    },
    findPermalink: {
      type: ArticleType,
      args: {
        slug: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (parentValue, args, ctx) => {
        const slug = args.slug;
        const $regex = new RegExp(slug, "gi")
        return articleModel.findOne({slug: {$regex}}) ;
      }
    }
  })
});
