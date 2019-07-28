import Users from "../../models/users";
import { generateToken } from "./../../auth";

/* USERS */

// login an user
export const loginUser = async ctx => {
    const { email, password } = ctx.request.body;
    let user = await Users.findOne({ email, password });
    if (user) {
      const id = user._id;
      let token = generateToken(id);
      ctx.body = { token };
    } else {
      ctx.status = 401;
    }
  };
  
  // create an user
  export const createUser = async ctx => {
    const { name, email, password } = ctx.request.body;
    const user = await Users.findOne({ email });
    if (!user) {
      await Users.create({ name, email, password });
      return (ctx.status = 200);
    } else {
      ctx.status = 501;
    }
  };