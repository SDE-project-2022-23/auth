import { UserModel } from "@db/user.db";
import { TokenRequest, User, UserWithPassword } from "@type/User";

export const createUser = async (
  user: Omit<UserWithPassword, "id">
): Promise<User> => {
  const newUser = new UserModel(user);
  try {
    return await newUser.save();
  } catch (err) {
    console.error(err);
    throw new Error(
      "createUser: Erreur lors de l'insertion de l'utilisateur dans la bdd"
    );
  }
};

export const getUserByLogin = async (
  login: string
): Promise<UserWithPassword | null> => {
  try {
    return await UserModel.findOne({ login: login }).exec();
  } catch (err) {
    console.error(err);
    throw new Error(
      "getUserByLogin: Erreur lors de la recherche de l'utilisateur dans la bdd"
    );
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  return UserModel.findOne({ _id: id })
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.error(err);
      throw new Error(
        "getUserById: Erreur lors de la recherche de l'utilisateur dans la bdd"
      );
    });
};
