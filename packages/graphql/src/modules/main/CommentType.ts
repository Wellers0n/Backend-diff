import { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} from 'graphql'
import {globalIdField} from 'graphql-relay'

export default new GraphQLObjectType({
    name: 'Comments',
    fields: () => ({
        id: globalIdField('Comments'),
        _id:{
            type: GraphQLID
        },
        username:{
            type: GraphQLString,
        },
        description:{
            type: GraphQLString
        },
        idArticle: {
            type: GraphQLString
        }
    })
})

