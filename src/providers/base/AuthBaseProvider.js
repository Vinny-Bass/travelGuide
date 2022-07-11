import NotImplementedException from "../../util/errors/notImplementedException.js"
import MysqlKnexBase from "./knex/mysql/MysqlTypeORMBase.js"


// Fake interface, contract to be followed
export default class AuthBaseProvider extends MysqlKnexBase {
  async findByCredentials(email, password) {
    throw new NotImplementedException(this.findByCredentials.name)
  }

  async create(email, password) {
    throw new NotImplementedException(this.create.name)
  }
}