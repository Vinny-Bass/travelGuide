import UserKnexProvider from "../providers/knex/mysql/UserKnexProvider.js";
import UserService from "../services/user/UserService.js";

export default class UserFactory {
  static async createInstance() {
    const userProvider = new UserKnexProvider()
    const userService = new UserService({ userProvider })

    return userService
  }
}