import UserBaseProvider from "../../base/UserBaseProvider.js";

export default class UserKnexProvider extends UserBaseProvider {
  constructor() {
    super()
    this.table = 'user'
  }

  async create(userData) {
    const knex = await super.connect()

    const newUserId = await knex(this.table).insert(userData)
    return newUserId[0]
  }

  async update(userId, userNewData) {
    const knex = await super.connect()

    const rowsAffected = await knex(this.table).update(userNewData).where('id', userId)
    return rowsAffected
  }

  async findById(id) {
    const knex = await super.connect()

    const user = await knex(this.table).select('*').where('id', id).first()
    return user
  }

  async delete(id) {
    const knex = await super.connect()

    const rowsAffected = await knex(this.table).del().where('id', id)
    return rowsAffected
  }
}