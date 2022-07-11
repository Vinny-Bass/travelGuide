export default class UnexistentUserError extends Error {
  constructor(userId) {
    super(`The user with the ID: ${userId} do not exists`)
    this.name = "UnexistentUserError"
  }
}