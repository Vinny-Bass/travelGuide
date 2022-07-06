import UserBaseProvider from "../../base/UserBaseProvider.js";

export default class UserKnexProvider extends UserBaseProvider {
  constructor() {
    super()
    this.table = 'user'
  }

  async register(authId, firstName, lastName, age) {
    const knex = await super.connect()

    const newUser = await knex(this.table).insert({ authId, firstName, lastName, age })
    return newUser
  }
}