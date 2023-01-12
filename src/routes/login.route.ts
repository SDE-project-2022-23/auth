import { Request, Response, Router } from "express";

const loginRouter = Router();

const login = async (req: Request, res: Response) => {
  // const user = req.body;
  // UserService.getUserByLogin(user)
  //   .then((userFind: User) => {
  //     res.status(200).json({ token: "not implemented" });
  //   })
  //   .catch((err) => {
  //     res.status(401).send({
  //       message: "" + err,
  //     });
  //   });
  return "not implemented";
};

loginRouter.post("/", login);

export default loginRouter;
