import { TokenRequest, User, UserWithPassword } from "@type/User";
import * as bcrypt from "bcrypt";
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
  public static async createUser(userRequest: TokenRequest): Promise<String> {
    return "not implemented";
  }
}
