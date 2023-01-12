import { UserService } from "@services/user.service";
import { User } from "@type/User";
import { Request, Response, Router } from "express";
import { createJwt } from "src/utils/jwt.utils";

const loginRouter = Router();

const login = async (req: Request, res: Response) => {
  const user = req.body;
  UserService.getUserByLogin(user)
    .then((userFind: User) => {
      res.status(200).json({ token: createJwt(userFind) });
    })
    .catch((err) => {
      res.status(401).send({
        message: "" + err,
      });
    });
};

loginRouter.post("/", login);

export default loginRouter;
