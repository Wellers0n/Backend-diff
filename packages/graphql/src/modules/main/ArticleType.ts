import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} from 'graphql'
import {globalIdField} from 'graphql-relay'

export default new GraphQLObjectType({
    name: 'Articles',
    fields: () => ({
        id: globalIdField('Articles'),
        _id:{
            type: GraphQLID
        },
        author:{
            type: new GraphQLList(GraphQLString),
        },
        date:{
            type: GraphQLString
        },
        date_update:{
            type: GraphQLString
        },
        title:{
            type: GraphQLString
        },
        subtitle:{
            type: GraphQLString
        },
        description:{
            type: GraphQLString
        },
        idUser: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        }
    })
})

