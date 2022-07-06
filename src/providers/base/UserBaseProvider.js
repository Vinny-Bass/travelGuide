import NotImplementedException from "../../util/errors/notImplementedException.js"
import MysqlKnexBase from "./knex/mysql/MysqlTypeORMBase.js"

export default class UserBaseProvider extends MysqlKnexBase {
  async register(authId, firstName, lastName, age) {
    throw new NotImplementedException(this.register.name)
  }
}