export default class UnexistentAuthIDError extends Error {
  constructor(authId) {
    super(`The auth client with the authID: ${authId} do not exists`)
    this.name = "UnexistentAuthIDError"
  }
}