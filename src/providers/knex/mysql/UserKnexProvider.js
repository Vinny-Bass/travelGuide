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
}

// ; (async () => {
//   const a = new UserKnexProvider()
//   const b = await a.update(10, { age: 44 })
//   console.log(b)
// })()