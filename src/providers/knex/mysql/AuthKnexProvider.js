import AuthBaseProvider from "../../base/AuthBaseProvider.js";

export default class AuthKnexProvider extends AuthBaseProvider {
  constructor() {
    super()
    this.table = 'auth'
  }

  async findByCredentials(email, password) {
    const knex = await super.connect()

    const userAuth = await knex(this.table).select('*').where('email', email)
      .andWhere('password', password)
      .returning('id')
    return userAuth
  }

  async register(email, password) {
    const knex = await super.connect()

    const newUserAuthId = await knex(this.table).insert({ email, password }).returning('id')
    return newUserAuthId
  }
}