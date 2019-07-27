import jwt from "jsonwebtoken";
import User from "./models/users";
import mongoose from "mongoose";

export async function getUser(token) {
  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token, "batman");

    const user = await User.findOne({ _id: decodedToken.id });

    return {
      user
    };
  } catch (err) {
    return { user: null };
  }
}

export const authMiddleware = async (ctx, next) => {
  const { authorization } = ctx.request.headers;
  if (authorization) {
      jwt.verify(authorization, 'batman', (err, decoded) => {
          if (err) return ctx.body = 401
          ctx.state.user = decoded.id;
      })
  }else{
      return ctx.status = 403
  }

  await next();

}

export function generateToken(user) {
  return jwt.sign({ id: user._id }, "batman");
}
