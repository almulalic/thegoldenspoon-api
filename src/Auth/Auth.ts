import cors from "cors";
import jwt from "jsonwebtoken";

require("dotenv").config();

export class Auth {
  static Authorize = (credentials = [] as any) => {
    return (req, res, next) => {
      const token = req.headers["authorization"];

      if (typeof credentials === "string") {
        credentials = [credentials];
      }

      if (token) {
        const tokenBody = token.slice(7);
        jwt.verify(tokenBody, process.env.JWT_SECRET, (err, decoded) => {
          if (!err) {
            next();
          } else {
            console.log(`JWT Error 1: ${err}`);
            return res
              .status(401)
              .send("Error: Access denied! Please provide a valid token.");
          }
        });
      } else {
        console.log(`JWT Error 2`);
        return res
          .status(401)
          .send("Error: Access denied! Please provide a valid token.");
      }
    };
  };
}
