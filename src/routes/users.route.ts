import { Router, RequestHandler } from "express";
import { TokenRequest } from "@type/User";
import { UserService } from "@services/user.service";

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

userRouter.post("/", createUser);

export default userRouter;
