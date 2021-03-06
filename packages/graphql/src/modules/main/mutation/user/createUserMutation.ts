import Users from "./../../../../model/users";
import { GraphQLString, GraphQLNonNull } from "graphql";
import { mutationWithClientMutationId } from "graphql-relay";

export default mutationWithClientMutationId({
  name: "createUserMutation",
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  mutateAndGetPayload: async ({ name, email, password }) => {
    const user = await Users.findOne({ email });
    // msg's
    const createUserSuccess = "User created successfully";
    const userExist = "User exist";

    if (!user) {
      await Users.create({ name, email, password });
      return {
        msg: createUserSuccess
      };
    }
    return {
      userExist: userExist
    };
  },
  outputFields: {
    msg: {
      type: GraphQLString,
      resolve: ({ msg }) => msg
    },
    userExist: {
      type: GraphQLString,
      resolve: ({ userExist }) => userExist
    }
  }
});
