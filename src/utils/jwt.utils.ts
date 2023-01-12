import { User } from "@type/User";
import { Secret, sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import path from "path";
import * as fs from "fs";

export const createJwt = (user: any) => {
  const secret = {
    key: process.env.JWT_SECRET,
    passphrase: process.env.JWT_PASSPHRASE,
  };
  const data = {
    id: user.id,
    login: user.login,
  };
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: "365d",
  };
  return sign(data, secret as Secret, options);
};

export function validateJwt(token: string): Promise<User> {
  const secret = {
    key: process.env.JWT_PUBLIC,
    passphrase: process.env.JWT_PASSPHRASE,
  };
  const publicKey = fs.readFileSync(path.join(__dirname, "./../../public.pem"));
  const verifyOptions: VerifyOptions = {
    algorithms: ["RS256"],
  };
  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded as User);
      }
    });
  });
}
