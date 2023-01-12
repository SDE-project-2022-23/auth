import { Router, RequestHandler } from "express";
import { TokenRequest } from "@type/User";
import { UserService } from "@services/user.service";
import { validateJwt } from "src/utils/jwt.utils";

const userRouter = Router();

const createUser: RequestHandler = async (req, res, next) => {
  const userRequest: TokenRequest = req.body;

  // creation de l'utilisateur
  UserService.createUser(userRequest)
    .then((userAdded) => {
      res.status(200).json({ user: userAdded });
    })
    .catch(next);
};

const authentification: RequestHandler = async (req, res, next) => {
  var token = req.headers.authorization;
  if (!token) {
    res.status(401).send({
      message: "You need to be connected to access this resource",
    });
  } else {
    if (token.toLowerCase().startsWith("bearer")) {
      token = token.slice("bearer".length).trim();
    }

    validateJwt(token)
      .then((user) => {
        // utiliser pour passer le user aux autres middlewares/fonctions
        res.status(200).send({
          user: user,
        });
      })
      .catch((err) => {
        res.status(401).send({
          message: "You need to be connected to access this resource",
        });
      });
  }
};

userRouter.get("/", authentification);
userRouter.post("/", createUser);

export default userRouter;
