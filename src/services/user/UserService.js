import UnexistentAuthIDError from "../../util/errors/unexistentAuthIDError.js"
import UnexistentUserError from "../../util/errors/unexistentUserError.js"

export default class UserService {
  constructor({ userProvider, authProvider }) {
    this.provider = userProvider
    this.authProvider = authProvider
  }

  async create(userData) {
    const { authId } = userData
    const authClient = await this.authProvider.findById(authId)

    if (!authClient) {
      throw new UnexistentAuthIDError(authId)
    }

    const userId = await this.provider.create(userData)
    return userId
  }

  async update(userId, userData) {
    const user = await this.provider.findById(userId)

    if (!user) {
      throw new UnexistentUserError(userId)
    }

    const rowsAffected = await this.provider.update(userId, userData)
    return rowsAffected
  }

  async get(userId) {
    const user = await this.provider.findById(userId)
    return user
  }

  async delete(userId) {
    const user = await this.provider.findById(userId)

    if (!user) {
      throw new UnexistentUserError(userId)
    }

    const rowsAffected = await this.provider.update(userId)
    return rowsAffected
  }
}