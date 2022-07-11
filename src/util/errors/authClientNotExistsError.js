export default class UserNotExistsError extends Error {
  constructor(userEmail) {
    super(`The ${userEmail} user not exists`)
    this.name = "UserNotExistsError"
  }
}