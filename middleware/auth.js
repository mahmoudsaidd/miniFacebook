import jwt from "jsonwebtoken";
import { userModel } from "../DB/models/user.model.js";

export const auth = () => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      var token = authorization.split(" ")[1];
      console.log(authorization.split(" "));
      if (authorization.startsWith("Bearer")) {
        const decoded = jwt.verify(token, process.env.tokenKey);
        console.log(decoded);
        if (decoded) {
          const user = await userModel.findById(decoded.id);
          if (user) {
            req.currentUserID = user._id;
            next();
          } else {
            res.json({ message: "User not found" });
          }
        } else {
          res.json({ message: "Invalid Token" });
        }
      } else {
        res.json({ message: "Invalid Token" });
      }
    } catch (error) {
      res.json({ message: "Error", error });
    }
  };
};
