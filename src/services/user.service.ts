import { TokenRequest, User, UserWithPassword } from "@type/User";
import * as bcrypt from "bcrypt";
import * as repo from "@repositories/user.repo";

/**
 * Service de resultat
 */

export class UserService {
  /**
   * Ajoute l'exercice commencé par l'étudiant a la bdd
   *
   * @param exoEtu L'exercice à insérer en bdd de type ExerciceEtudiant
   * @returns true si tout c'est bien passé lors de l'ajout.
   * @throws Error si erreur lors de l'insertion
   */
  public static async createUser(userRequest: TokenRequest): Promise<User> {
    return await repo.createUser(this.construireUser(userRequest));
  }

  public static async getUserByLogin(userRequest: TokenRequest): Promise<User> {
    const user = await repo.getUserByLogin(userRequest.login);
    if (!user) {
      throw new Error("User not found");
    }
    if (!bcrypt.compareSync(userRequest.password, user.password)) {
      throw new Error("Password incorrect");
    }
    return user;
  }

  private static construireUser(
    user: TokenRequest
  ): Omit<UserWithPassword, "id"> {
    const salt = bcrypt.genSaltSync(10);
    console.log(user.password);
    return {
      login: user.login,
      password: bcrypt.hashSync(user.password, salt),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
