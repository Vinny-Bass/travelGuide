export default class UserService {
  constructor({ userProvider }) {
    this.provider = userProvider
  }

  async register({ authId, firstName, lastName, age }) {
    const user = await this.provider.register(authId, firstName, lastName, age)
    return user
  }
}