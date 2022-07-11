export default class UserAlreadyExistsError extends Error {
  constructor(userEmail) {
    super(`The ${userEmail} user already exists`)
    this.name = "UserAlreadyExistsError"
  }
}