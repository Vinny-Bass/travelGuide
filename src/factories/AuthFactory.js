import AuthKnexProvider from "../providers/knex/mysql/AuthKnexProvider.js";
import AuthService from "../services/auth/AuthService.js";
import PasswordEncrypter from "../services/shared/PasswordEncrypter.js";
import TokenHandler from "../services/shared/TokenHandler.js";

export default class AuthFactory {
  static async createInstance() {
    const authProvider = new AuthKnexProvider()
    const tokenHandler = new TokenHandler()
    const passwordEncrypter = new PasswordEncrypter()

    const authService = new AuthService({
      authProvider,
      tokenHandler,
      passwordEncrypter
    })

    return authService
  }
}