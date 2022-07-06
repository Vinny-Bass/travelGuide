import AuthKnexProvider from "../providers/knex/mysql/AuthKnexProvider.js";
import AuthService from "../services/auth/AuthService.js";

export default class AuthFactory {
  static async createInstance() {
    const authProvider = new AuthKnexProvider()
    const authService = new AuthService({ authProvider })

    return authService
  }
}