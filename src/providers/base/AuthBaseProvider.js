import NotImplementedException from "../../util/errors/notImplementedException.js"
import MysqlKnexBase from "./knex/mysql/MysqlTypeORMBase.js"


// Fake interface, contract to be followed
export default class AuthBaseProvider extends MysqlKnexBase {
  async findByCredentials(email, password) {
    throw new NotImplementedException(this.authenticate.name)
  }

  async register(email, password) {
    throw new NotImplementedException(this.register.name)
  }
}